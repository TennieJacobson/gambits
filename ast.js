function Block(statements) {
  this.evaluate = function(env) {
    statements.forEach(statement => statement.evaluate(env));
  }
}

function ExpressionDecimal(literal) {
  this.evaluate = function(env){
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
    return lExpression.evaluate(env) - rExpression.evaluate(env);
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

function ExpressionWhile(condition, block) {
  this.evaluate = function(env) {
    while(condition.evaluate(env) != 0) {
      block.evaluate(env);
    }
  }
}

function StatementPrint(messageExpression) {
  this.evaluate = function(env) {
    var message = messageExpression.evaluate(env);
    var output = document.getElementById('output');
    output.innerHTML = output.innerHTML + message + '<br>';
    console.log(message);
  }
}

function StatementAssignment(id, rhsExpression) {
  this.evaluate = function(env) {
    env[id] = rhsExpression.evaluate(env);
  }
}
/*
Block
  Statements*
    Expressions*
*/
