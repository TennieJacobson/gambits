//Abstract Statement Tree
// going to need lists still, which includes assigning a variable versus just accessing one
// printbits will be needed.
// function capabilities
// almost there!


function Block(statements) {
  this.evaluate = function(env, callback) {
    statements.forEach(statement => statement.evaluate(env));
  }
}

function ExpressionDecimal(literal) {
  this.evaluate = function(env){
    return literal;
  }
}

function ExpressionStringLiteral(literal) {
    this.evaluate = function(env) {
        return literal;
    }
}

function ExpressionFile(){
  this.evaluate = function(env) {
    return fileText;
  }
}

function ExpressionBoolLiteral(literal){
    this.evaluate = function(env) {
        return literal;
    }
}

function ExpressionBitstringLiteral(literal){
  this.evaluate = function(env) {
    return parseInt(literal, 2);
  }
}

function ExpressionIntegerLiteral(literal) {
  this.evaluate = function(env) {
    return literal;
  }
}

function ExpressionNullLiteral(literal) {
  this.evaluate = function(env) {
    return literal;
  }
}

function ExpressionListLiteral(literal) {
  this.evaluate = function(env) {
    var result = literal.map((item) => item.evaluate(env));
    return result;
  }
}

function ExpressionDictionaryLiteral(keyVals) {
  this.evaluate = function(env) {
    var result = keyVals.reduce((res, item) => {
      res[item.id] = item.value.evaluate(env);
      return res;
    }, {});
    console.log(result);
    return result;
  }
}

function ExpressionMore(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA > valueB;
  }
}

function ExpressionMoreOrEqual(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA >= valueB;
  }
}

function ExpressionLess(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA < valueB;
  }
}

function ExpressionLessOrEqual(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA <= valueB;
  }
}

function ExpressionEqual(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA == valueB;
  }
}

function ExpressionNotEqual(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA != valueB;
  }
}

function ExpressionLeftShift(a, b){
  this.evaluate = function(env){
    var start = a.evaluate(env);
    var degree = b.evaluate(env);
    return start << degree >>> 0;
  }
}

function ExpressionBooleanAnd(a, b) {
    this.evaluate = function(env) {
        var l = a.evaluate(env);
        var r = b.evaluate(env);
        return l && r;
    }
}

function ExpressionBooleanOr(a, b) {
    this.evaluate = function(env) {
        var l = a.evaluate(env);
        var r = b.evaluate(env);
        return l || r;
    }
}

function ExpressionBooleanNot(a) {
    this.evaluate = function(env) {
        var l = a.evaluate(env);
        return !(l);
    }
}

function ExpressionBitAnd(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA & valueB >>> 0;
  }
}

function ExpressionBitOr(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA | valueB >>> 0;
  }
}

function ExpressionBitXOR(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA ^ valueB >>> 0;
  }
}

function ExpressionFlip(a) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    return  ~valueA >>> 0;
  }
}

function ExpressionRightShift(a, b){
  this.evaluate = function(env){
    var start = a.evaluate(env);
    var degree = b.evaluate(env);
    return start >>> degree;
  }
}

function ExpressionAdd(lExpression, rExpression) {
  this.evaluate = function(env) {
    return lExpression.evaluate(env) + rExpression.evaluate(env);
  }
}

function ExpressionSubtract(lExpression, rExpression) {
  this.evaluate = function(env) {
    if(lExpression == 0) {
      return (0 - rExpression.evaluate(env));
    } else {
      return lExpression.evaluate(env) - rExpression.evaluate(env);
    }
  }
}

function ExpressionMultiply(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA * valueB;
  }
}

function ExpressionDivide(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA / valueB;
  }
}

function ExpressionExponent(a, b) {
  //a will be base and b will be significant
  this.evaluate = function(env) {
    var base = a.evaluate(env);
    var exponent = b.evaluate(env);
    return Math.pow(base, exponent);
  }
}

function ExpressionNRoot(a, b) {
  this.evaluate = function(env) {
    var base = a.evaluate(env);
    var exponent = b.evaluate(env);
    return Math.pow(base, (1/exponent));
  }
}

function ExpressionMod(a, b) {
  this.evaluate = function(env) {
    var valueA = a.evaluate(env);
    var valueB = b.evaluate(env);
    return valueA % valueB;
  }
}

function ExpressionVariableReference(id) {
  this.evaluate = function(env) {
    return env[id];
  }
}

function ExpressionIf(condition, thenBlock, elseBlock) {
  this.evaluate = function(env) {
    var value = condition.evaluate(env);
    if(value != 0){
      thenBlock.evaluate(env);
    } else {
      elseBlock.evaluate(env);
    }
  }
}

function ExpressionAccessObject(identifier, index) {
  this.evaluate = function(env) {
    var obj = env[identifier];

    if(typeof obj == "string"){
      return obj.charAt(index.evaluate(env));
    } else {
      return obj[index.evaluate(env)];
    }

  }
}

function StatementSetObject(identifier, index, value) {
  this.evaluate = function(env) {
    var list = env[identifier];
    list[index.evaluate(env)] = value.evaluate(env);
  }
}

function StatementWhile(condition, block) {
  this.evaluate = function(env) {
    while(condition.evaluate(env) != 0) {
      block.evaluate(env);
    }
  }
}

function StatementPrint(messageExpression) {
  this.evaluate = function(env) {
    var message = messageExpression.evaluate(env);

    //lists
    if(typeof(message) === "object"){
        message = JSON.stringify(message);
    }

    console.log(message);
    var output = document.getElementById('output');
    output.value = output.value + message + '\n';

    output.value = output.value.replace(/\\n/g, "\n");
    output.value = output.value.replace(/\\t/g, "\t");

  }
}

function StatementPrintBits(messageExpression) {
  this.evaluate = function(env) {
    var message = messageExpression.evaluate(env);
    var output = document.getElementById('output');

    var result;
    if(typeof(message) === "object"){
      //list
      if(message instanceof Array){
        result = message.map((item) => {
          if(typeof(item) != "string"){
            item = item.toString(2) + 'b';
          }
          return item;
        });
        result = JSON.stringify(result);
      } else {
        // printbits for objects doesn't really make sense.
        result = JSON.stringify(message);
      }
    } else {
      var result = message.toString(2);
    }


    if(typeof(message) != "string" && typeof(message) != "object") {
      output.value = output.value + result + 'b\n';
    } else {
      output.value = output.value + result + '\n';
      output.value = output.value.replace(/\\n/g, "\n");
      output.value = output.value.replace(/\\t/g, "\t");
    }
  }
}

function StatementAssignment(id, rhsExpression) {
  this.evaluate = function(env) {
    env[id] = rhsExpression.evaluate(env);
  }
}

function StatementFunctionDefine(name, formals, body) {
  this.evaluate = function(env) {
    env.functions[name] = {name: name, formals: formals, body: body};
  }
}

function ExpressionFunctionCall(name, actuals) {
  this.evaluate = function(env) {
    if (env.functions.hasOwnProperty(name)) {
      var f = env.functions[name];

      var innerScope = {};
      innerScope.functions = env.functions;
      actuals.forEach((actual, i) => {
        var formal = f.formals[i];
        innerScope[formal] = actual.evaluate(env);
      });

      f.body.evaluate(innerScope);
      var temp = innerScope.__returnValue;
      if(temp) {
        delete innerScope.__returnValue; //test this...
        return temp;
      }
    } else {
      throw 'No such function: [' + name + ']';
    }
  }
}

function StatementSend(value){
  this.evaluate = function(env) {
    env.__returnValue = value.evaluate(env);
  }
}
/*
Block
  Statements*
    Expressions*
    print "hello world!"

FUN FUNCTION FOR PRIMES
define isPrime(target)
  i = 2
  check = true

  while i < target and check
    if target % i == 0 then
      check = false
    done
    i = i + 1
  done
  send check
done

print isPrime(7)
*/
