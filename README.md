
# GamBits
By Seth Gilbert and Tennie Jacobson

## Purpose
To make it easier to understand and do bit manipulation for data compression and cryptography.

## Description/Features
GamBits has understandable bit wise operators and a built in BitString type. Our goal was to make it readable, intuitive, and not overly verbose. There are built in dictionaries to make hash tables easy. Trees can be made with a combination of dictionaries and arrays. With these tools, the developer will be able to do data compression and cryptography without the headache. Our powerful interpreter is written in JavaScript.

## Grammar

```
program
  :  statement* EOF

statement
  :  IDENTIFIER ASSIGNMENT expression
  |  IF LEFT_PARENTHESIS expression RIGHT_PARENTHESIS THEN statement* (ELSE statement*)? DONE
  |  DEFINE IDENTIFIER LEFT_PARENTHESIS (IDENTIFIER COMMA)* IDENTIFIER RIGHT_PARENTHESIS statement* DONE
  |  WHILE LEFT_PARENTHESIS expression RIGHT_PARENTHESIS statement* DONE
  |  PRINT expression
  |  (IDENTIFIER DOT)? IDENTIFIER LEFT_PARENTHESIS (expression COMMA)* expression RIGHT_PARENTHESIS
  |  MULTI_COMMENT .* MULTI_COMMENT
  |  OCTOTHORP .* \n

expression
  :  BITSTRING
  |  INTEGER
  |  BOOLEAN
  |  STRING
  |  CHARACTER
  |  LEFT_CURLY RIGHT_CURLY
  |  LEFT_CURLY (IDENTIFIER COLON expression COMMA)* IDENTIFIER COLON expression RIGHT_CURLY
  |  IDENTIFIER LEFT_SQUARE expression RIGHT_SQUARE
  |  LEFT_SQUARE (expression COMMA)* expression RIGHT_SQUARE
  |  LEFT_SQUARE RIGHT_SQUARE
  |  expression (ASTERISK|DIVIDE|PERCENT|CARROT) expression
  |  expression (PLUS|DASH) expression
  |  expression (BIT_AND|BIT_OR|XOR|R_SHIFT|L_SHIFT) expression
  |  FLIP expression
  |  expression (GREATER|GREATER_OR_EQUAL|LESS|LESS_OR_EQUAL|EQUAL|NOT_EQUAL) expression
  |  expression (AND|OR) expression
  |  FILE

```

## Examples
```
bs = 100111b
mask = 1101b
ans = bs & mask
printbits ans //outputs 101b
print ans // outputs 5
```

```
# FUN FUNCTION FOR PRIMES
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
```

## How to build and run the interpreter
Clone a branch of our terp repository and open up index.html in Google Chrome.

You can run your own GamBit by clicking the "Run!" button or by pushing Ctl+Enter.
To start, the FILE keyword will return undefined.  Once a file is uploaded, the text contents are stored in the FILE keyword.

### Notes:
Math: +,-,*,/,%,^ (exponent)
Bits: xor, >>, <<, &, |, flip
comments: #
functions: define funcName(p1, p2) ... done
bit strings: 110101b
conditionals: <=, >=, ==, and, or, !, !=
if expression then ... done
Dictionaries: {}
Arrays: []
print: print, printbits
boolean: true, false
