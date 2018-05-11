function parse(tokens) {
  var i = 0;

  function has(tokenType) {
    return i < tokens.length && tokens[i].type == tokenType;
  }

  function devour() {
    var token = tokens[i];
    i++;
    return token;
  }

  function program() {
    var statements = [];
    while (!has(EOF)) {
      statements.push(statement());
    }
    return new Block(statements);
  }

  function statement() {
    if(has(PRINT)){
      devour();
      var message = expression();
      return new StatementPrint(message);
    } else if(has(SEND)){
      devour();
      var retVal = expression();
      return new StatementSend(retVal);
    } else if(has(PRINTBITS)){
      devour(); //printbits keyword
      var message = expression();
      return new StatementPrintBits(message);
    } else if (has(IDENTIFIER)) {
      var idToken = devour();
      //check for LEFT_SQUARE
      if(has(LEFT_SQUARE) || has(LEFT_CURLY)){
        //list index assignment.
        devour(); //eat LEFT_something

        var index = expression();
        if(has(RIGHT_SQUARE) || has(RIGHT_CURLY)){
          devour();
        } else {
          throw 'Expected closing bracket for list/dictionary assignment [' + idToken.source + ']';
        }

        if(has(ASSIGN)){
          devour();
          var rhs = expression();
          return new StatementSetObject(idToken.source, index, rhs);
        } else {
          throw 'Expected assignment after attempt to set index of object [' + idToken.source + ']';
        }
      } else {
        // var idToken = devour();
        if (has(ASSIGN) || has(COLON)/*<-Not sure about this -Tennie's note */){
          devour();
          var rhs = expression();
          return new StatementAssignment(idToken.source, rhs);
        } else if (has(LEFT_PARENTHESIS)) {
          devour();//eat left parenthesis
          var actuals = [];
          var delimeter = {type:COMMA}
          if(!has(RIGHT_PARENTHESIS)){
            while(delimeter.type == COMMA) {
              actuals.push(expression());
              delimeter = devour();  //should be a comma.
            }
          } else {
            devour(); //right parenthesis
          }

          return new ExpressionFunctionCall(idToken.source, actuals);
        } else {
          throw 'Error, expected assignment after variable name. [' + idToken.source + ']';  //TODO fix error message.
        }
      }
    } else if(has(IF)){
      return conditional();
    } else if(has(WHILE)) {
      return loop();
    } else if (has(DEFINE)) {
      devour(); // eat define keyword
      var idToken = devour(); //eat name of function
      if(!has(LEFT_PARENTHESIS)) {
        throw 'Missing a left parenthesis after defining function [' + idToken.source + ']';
      } else {
        devour();
      }

      var formals = [];
      var delimeter = {type:COMMA}
      if(!has(RIGHT_PARENTHESIS)){
        while (has(IDENTIFIER) && delimeter.type == COMMA) {
          var formalToken = devour();
          delimeter = devour();
          formals.push(formalToken.source);
        }

        if(delimeter.type != RIGHT_PARENTHESIS){
          throw 'Missing a right parenthesis after defining function [' + idToken.source + ']';
        }
      } else {
        devour();//eat right parenthesis
      }

      var statements = [];
      while (i < tokens.length && !has(DONE)) {
        statements.push(statement());
      }
      devour(); //eat done keyword
      return new StatementFunctionDefine(idToken.source, formals, new Block(statements));
    } else {
      throw 'You messed up big time, idiot. I don\'t know ' + tokens[i].type + ':' + tokens[i].source;
    }
  }

  function loop() {
    devour(); //eat while keyword

    var condition = expression();
    if(!has(THEN)){
      throw 'expected "then" after "while" loop.\nloop: [' + condition.toString() + "]";
    }
    devour(); //eat then keyword
    var statements = [];

    while(i < tokens.length-1 && !has(DONE)){
      statements.push(statement());
    }

    if(!has(DONE)){
      throw 'expected "done" after "while" loop.\nloop: [' + condition.toString() + "]";
    }

    devour(); //eat done keyword
    var block = new Block(statements);
    return new StatementWhile(condition, block);
  }


  function conditional(){
    devour(); //eat if keyword
    var condition = expression();
    if(!has(THEN)){
      throw 'expected "then" after "if" conditional.\ncondition: [' + condition.toString() + "]";
    }
    devour(); //eat then keyword

    var ifstmts = [];
    var elsestmts = [];
    while(i < tokens.length && !has(DONE) && !has(ELSE)){
      ifstmts.push(statement());
    }

    var keyword = devour(); //eat done/else keyword.

    if(keyword.type == ELSE){
      while(i < tokens.length && !has(DONE)){
        elsestmts.push(statement());
      }
      devour(); //eat done keyword
    }

    var ifBlock = new Block(ifstmts);
    var elseBlock = new Block(elsestmts);
    return new ExpressionIf(condition, ifBlock, elseBlock);
  }

  function expression() {
    var val;
    //note: This stuff up top makes it so we need parenthesis around the flip to make work...
    if(has(FLIP) || has(NOT) /*|| has(DASH)*/){
        var token = devour(); //see if flip or ! or -
        if(token.type == FLIP){
        var toFlip = expression();
            val = new ExpressionFlip(toFlip);
      } else {
        var toFlip = expression();
        val = new ExpressionBooleanNot(toFlip);
      }
    } else {
      val = bool();
    }
    return val;
  }

  function bool() {
      var l = bitcompare();
      while(has(AND) || has(OR)){
          var operator = devour();
          var r = bitcompare();
          if(operator.type == AND){
              l = new ExpressionBooleanAnd(l, r);
          } else {
              l = new ExpressionBooleanOr(l, r);
          }
      }
      return l;
  }

  function bitcompare(){
    var l = relational();
    while (has(BIT_AND) || has(XOR) || has(BIT_OR)){
      var operator = tokens[i];
      devour();
      var r = relational();
      if(operator.type == BIT_AND){
        l = new ExpressionBitAnd(l, r);
      } else if(operator.type == XOR) {
        l = new ExpressionBitXOR(l, r);
      } else {
        l = new ExpressionBitOr(l, r);
      }
    }
    return l;
  }

  function relational() {
    var a = bitshift();
    while (has(MORE_OR_EQUAL) || has(MORE) || has(LESS_OR_EQUAL) || has(LESS) || has(EQUAL) || has(NOT_EQUAL)) {
      var operator = tokens[i];
      devour(); // eat operator
      var b = bitshift();
      if (operator.type == MORE_OR_EQUAL) {
        a = new ExpressionMoreOrEqual(a, b);
      } else if (operator.type == MORE) {
        a = new ExpressionMore(a, b);
      } else if (operator.type == LESS_OR_EQUAL) {
        a = new ExpressionLessOrEqual(a, b);
      } else if (operator.type == LESS) {
        a = new ExpressionLess(a, b);
      } else if (operator.type == EQUAL) {
        a = new ExpressionEqual(a, b);
      } else {
        a = new ExpressionNotEqual(a, b);
      }
    }
    return a;
  }

  function bitshift(){
    var l = additive();
    while (has(L_SHIFT) || has(R_SHIFT)){
      var operator = tokens[i];
      devour();
      var r = additive();
      if(operator.type == L_SHIFT){
        l = new ExpressionLeftShift(l, r);
      } else {
        l = new ExpressionRightShift(l, r);
      }
    }

    return l;
  }

  function additive() {
    var l = multiplicative();
    while (has(PLUS) || has(DASH)) {
      var operatorToken = devour();
      var r = multiplicative();
      if (operatorToken.type == PLUS) {
        l = new ExpressionAdd(l, r);
      } else {
        l = new ExpressionSubtract(l, r);
      }
    }
    return l;
  }

  function multiplicative() {
    var a = exponential();
    while (has(ASTERISK) || has(DIVIDE) || has(MOD)) {
      var operator = tokens[i];
      devour(); // eat operator
      var b = exponential();
      if (operator.type == ASTERISK) {
        a = new ExpressionMultiply(a, b);
      } else if (operator.type == MOD) {
        a = new ExpressionMod(a, b);
      } else {
        a = new ExpressionDivide(a, b);
      }
    }
    return a;
  }

  function exponential(){
    var a = atom();
    while (has(CARROT) || has(NROOT)) {
      var operator = tokens[i];
      devour();
      var b = atom();
      if (operator.type == CARROT) {
        a = new ExpressionExponent(a, b);
      } else {
        a = new ExpressionNRoot(a, b);
      }
    }
    return a;
  }

  function atom() {
    if(has(BOOL)){
        var token = devour();
        return new ExpressionBoolLiteral(token.source);
    } else if(has(DASH)) {
      devour();
      var pos_int = devour();
      if(pos_int.type == INTEGER) {
        return new ExpressionIntegerLiteral(parseInt('-' + pos_int.source));
      } else {
        throw "expected an integer after the dash (-) [" + pos_int + "]";
      }
    } else if (has(INTEGER)) {
      var token = devour();
      return new ExpressionIntegerLiteral(parseInt(token.source));
    } else if (has(DECIMAL)){
      var token = devour();
      return new ExpressionDecimal(Number(token.source));
    } else if (has(BITSTRING)){
      var token = devour();
      return new ExpressionBitstringLiteral(token.source);
    } else if(has(STRING)) {
        var token = devour();
        return new ExpressionStringLiteral(token.source);
    } else if (has(NULL)) {
      var token = devour();
      return new ExpressionNullLiteral(token.source);
    } else if (has(IDENTIFIER)) {
      var token = devour();
      if(has(LEFT_PARENTHESIS)){
        devour();//eat left parenthesis
        var actuals = [];
        var delimeter = {type:COMMA}

        while (!has(RIGHT_PARENTHESIS) && delimeter.type == COMMA) {
          actuals.push(expression());
          delimeter = devour();  //should be a comma.
        }

        return new ExpressionFunctionCall(token.source, actuals);
      } else if(has(LEFT_SQUARE) || has(LEFT_CURLY)){
        //accessing in lists.
        devour(); //eat left_something
        var index = expression();
        if(has(RIGHT_SQUARE) || has(RIGHT_CURLY)){
          devour();
        } else {
          throw 'expected "]/}" to close list reference for [' + token.source + ']'
        }

        return new ExpressionAccessObject(token.source, index);
      } else {
        return new ExpressionVariableReference(token.source);
      }
    } else if(has(LEFT_SQUARE)) {
      devour(); //eat left LEFT_SQUARE
      var expressions = [];

      if(!has(RIGHT_SQUARE)){
        var delimiter = {type:COMMA};
        while(delimiter.type === COMMA){
          expressions.push(expression());
          delimiter = devour();
        }
        if(delimiter.type != RIGHT_SQUARE){
          throw 'Expected "]" to end list initiation.';
        }
      } else {
        devour();
      }

      return new ExpressionListLiteral(expressions);
    } else if(has(LEFT_CURLY)){
      devour();//eat LEFT_CURLY
      var keyVals = [];

      var idToken;
      if(!has(RIGHT_CURLY)) {
        var delimiter = {type : COMMA};
        while(delimiter.type === COMMA) {
          if(has(IDENTIFIER)) {
            idToken = devour();
          } else {
            idToken = expression();
          }
          if(has(COLON)){
            devour();//eat COLON
            var rhs = expression();
            var combo = {
              id : idToken,
              value : rhs
            }

            keyVals.push(combo);

            delimiter = devour(); //eat comma or RIGHT_CURLY
          } else {
            throw 'Expected COLON after identifier in object [' + idToken.source + ']';
          }
        }
        if(delimiter.type != RIGHT_CURLY) {
          throw 'Expected RIGHT_CURLY after an object initialization [' + delimiter.source + ']';
        }
      } else {
        devour();
      }

      return new ExpressionDictionaryLiteral(keyVals);
    } else if (has(LEFT_PARENTHESIS)) {
      devour();
      var e = expression();
      if (!has(RIGHT_PARENTHESIS)) {
        throw "Expression unbalanced, expected ')' after [" + e + "]";
      }
      devour();
      return e;
    } else if(has(FILE)){
      devour();
      return new ExpressionFile();
    } else {
      throw 'I expected an expression. That\'s NOT what I found. ' + tokens[i].source;
    }
  }

  return program();
}
