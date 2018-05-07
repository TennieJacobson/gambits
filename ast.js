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

function ExpressionListLiteral(literal) {
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
    var result = message.toString(2);

    if(typeof(message) != "string") {
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

  while i < target and check then
    if target % i == 0 then
      check = false
    done
    i = i + 1
  done
  send check
done

print isPrime(7)
*/

