//Abstract Statement Tree
// going to need lists still, which includes assigning a variable versus just accessing one
// printbits will be needed.
// function capabilities
// almost there!


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

function ExpressionStringLiteral(literal) {
    this.evaluate = function(env) {
        return literal;
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

function StatementPrintBits(messageExpression) {
    this.evaluate = function(env) {
      var message = messageExpression.evaluate(env);
      var result = (message >>> 0).toString(2);
      var output = document.getElementById('output');
      output.innerHTML = output.innerHTML + result + 'b<br>';
      console.log(message);
    }
}

function StatementAssignment(id, rhsExpression) {
  this.evaluate = function(env) {
    env[id] = rhsExpression.evaluate(env);
  }
}

function StatementFunctionDefine(name, formals, body) {
  this.evaluate = function(env) {
    env[name] = {name: name, formals: formals, body: body};
  }
}

function StatementFunctionCall(name, actuals) {
  this.evaluate = function(env) {
    if (env.hasOwnProperty(name)) {
      var f = env[name];

      var innerScope = {};
      actuals.forEach((actual, i) => {
        var formal = f.formals[i];
        innerScope[formal] = actual.evaluate(env);
      });

      f.body.evaluate(innerScope);
    } else {
      throw 'no such function ' + name;
    }
  }
}
/*
Block
  Statements*
    Expressions*
    print "hello world!"
isPrime = 227

FUN FUNCTION FOR PRIMES
i = 2
check = 0
while i < isPrime
  if isPrime % i == 0 then
    check = 1
  done
  i = i + 1
done

if check == 0 then
  print "FOUND A PRIME!"
else
  print "Not a prime"
done
*/

