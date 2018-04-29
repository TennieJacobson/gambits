
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
  |  IF LEFT_P expression RIGHT_P THEN statement* (ELSE statement*)? DONE
  |  DEFINE IDENTIFIER LEFT_P (IDENTIFIER COMMA)* IDENTIFIER RIGHT_P statement* DONE
  |  WHILE LEFT_P expression RIGHT_P statement* DONE
  |  PRINT expression
  |  (IDENTIFIER DOT)? IDENTIFIER LEFT_P (expression COMMA)* expression RIGHT_P
  |  MULTI_COMMENT .* MULTI_COMMENT
  |  OCTOTHORP .* \n

expression
  :  BITSTRING
  |  INTEGER
  |  BOOLEAN
  |  STRING
  |  CHARACTER
  |  LEFT_CURLY (IDENTIFIER COLON expression COMMA)* IDENTIFIER COLON expression RIGHT_CURLY
  |  IDENTIFIER LEFT_SQUARE expression RIGHT_SQUARE
  |  LEFT_SQUARE (expression COMMA)* expression RIGHT_SQUARE
  |  LEFT_SQUARE RIGHT_SQUARE
  |  expression (ASTERISK|DIVIDE|PERCENT|CARROT) expression
  |  expression (ONES_COMP|PLUS|DASH) expression
  |  expression (BIT_AND|BIT_OR|XOR|R_SHIFT|L_SHIFT) expression
  |  FLIP expression
  |  expression (GREATER|GREATER_OR_EQUAL|LESS|LESS_OR_EQUAL|EQUAL|NOT_EQUAL) expression
  |  expression (AND|OR) expression
  |  FILE LEFT_P expression RIGHT_P

```

## Examples
```
bs = 00100111b
mask = 00000001b
ans = bs and (flip mask)
print ans //outputs 100110
```

## How to build and run the interpreter
Clone a branch of our Terp repository and open up index.html in Google Chrome.

### Notes:
Math: +,-,*,/,%,^ (exponent)
Bits: xor, >>, <<, &, |, flip
comments: ``, #
functions: define funcName(p1, p2) ... done
bit strings: 110101b
loops: while
conditionals: <=, >=, ==, and, or, !, !=
if expression then ... done
one's complement addition: ++
Dictionaries: {}
Files: FILE(url)
Arrays: []
print: print
boolean: true, false


parseInt(binaryString, 2) -> bitstring to base 10.

numObj.toString(2) -> number to base2 string.
