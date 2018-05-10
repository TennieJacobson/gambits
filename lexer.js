//expressions
var IDENTIFIER = 'IDENTIFIER';
var PLUS = 'PLUS';
var DIVIDE = 'DIVIDE';
var DASH = 'DASH';
var ASTERISK = 'ASTERISK';
var NROOT = 'NROOT';
var COMMA = 'COMMA';
var MOD = 'MOD';
var OCTOTHORP = 'OCTOTHORP';
var CARROT = 'CARROT';
var ASSIGN = 'ASSIGN';
var EOF = 'EOF';
var STRING = 'STRING';

//blocks
var IF = 'IF';
var THEN = 'THEN';
var ELSE = 'ELSE';
var DONE = 'DONE';
var DEFINE = 'DEFINE';
var WHILE = 'WHILE';
var PRINT = 'PRINT';
var PRINTBITS = 'PRINTBITS';
var SEND = 'SEND';

//literals
var DECIMAL = 'DECIMAL';
var INTEGER = 'INTEGER';
var CHAR = 'CHAR';
var STRING = 'STRING';
var BOOL = 'BOOL';
var BITSTRING = 'BITSTRING';
var FILE = 'FILE';
var NULL = 'NULL'

//bit operators
var FLIP = 'FLIP';
var BIT_AND = 'BIT_AND';
var BIT_OR = 'BIT_OR';
var XOR = 'XOR';
var R_SHIFT = 'R_SHIFT';
var L_SHIFT = 'L_SHIFT';
var ONES_COMP = 'ONES_COMP';

//brackets
var LEFT_PARENTHESIS = 'LEFT_PARENTHESIS';
var RIGHT_PARENTHESIS = 'RIGHT_PARENTHESIS';
var LEFT_SQUARE = 'LEFT_SQUARE';
var RIGHT_SQUARE = 'RIGHT_SQUARE';
var LEFT_CURLY = 'LEFT_CURLY';
var RIGHT_CURLY = 'RIGHT_CURLY';
var COLON = 'COLON';

//comparators
var MORE_OR_EQUAL = 'MORE_OR_EQUAL';
var MORE = 'MORE';
var LESS_OR_EQUAL = 'LESS_OR_EQUAL';
var LESS = 'LESS';
var EQUAL = 'EQUAL';
var NOT_EQUAL = 'NOT_EQUAL';

//boolean operators
var AND = 'AND';
var OR = 'OR';
var NOT = 'NOT';


function lex(source){

  var tokens = [];
  var tokenSoFar = '';
  var i = 0;

  function has(regex) {
    return source.charAt(i).match(regex);
  }

  function devour() {
    tokenSoFar += source.charAt(i);
    i += 1;
  }

  function skip() {
    i += 1;
  }

  function emit(type) {
    tokens.push({type: type, source: tokenSoFar});
    tokenSoFar = '';
  }

  while (i < source.length) {
    if (has(/\+/)) {
      devour();
      if(has(/\+/)){
        devour();
        emit(ONES_COMP);
      } else {
        emit(PLUS);
      }
    } else if (has(/%/)) {
      devour();
      emit(MOD);
    } else if (has(/,/)) {
      devour();
      emit(COMMA);
    } else if(has(/:/)) {
      devour();
      emit(COLON);
    } else if (has(/\"/)) {
      skip();
      while(has(/[^"]/)){
        devour();
      }
      skip();
      emit(STRING);
    } else if (has(/=/)){
      devour();
      if(has(/=/)){
        devour();
        emit(EQUAL);
      } else {
        emit(ASSIGN);
      }
    } else if (has(/</)){
      devour();
      if(has(/=/)){
        devour();
        emit(LESS_OR_EQUAL);
      } else if (has(/</)) {
        devour();
        emit(L_SHIFT);
      } else {
        emit(LESS);
      }
    }else if (has(/>/)){
      devour();
      if(has(/=/)){
        devour();
        emit(MORE_OR_EQUAL);
      } else if (has(/>/)) {
        devour();
        emit(R_SHIFT);
      } else {
        emit(MORE);
      }
    } else if (has(/!/)) {
      devour();
      if(has(/=/)){
        devour();
        emit(NOT_EQUAL);
      } else {
        emit(NOT);
      }
    } else if (has(/&/)) {
      devour();
      emit(BIT_AND);
    } else if(has(/\|/)) {
      devour();
      emit(BIT_OR);
    } else if (has(/-/)) {
      devour();
      emit(DASH);
    } else if (has(/\(/)) {
      devour();
      emit(LEFT_PARENTHESIS);
    } else if (has(/\)/)) {
      devour();
      emit(RIGHT_PARENTHESIS);
    } else if(has(/\[/)) {
      devour();
      emit(LEFT_SQUARE);
    } else if(has(/]/)) {
      devour();
      emit(RIGHT_SQUARE);
    } else if(has(/{/)) {
      devour();
      emit(LEFT_CURLY);
    } else if(has(/\}/)) {
      devour();
      emit(RIGHT_CURLY);
    } else if (has(/\*/)) {
      devour();
      emit(ASTERISK);
    } else if (has(/\^/)) {
      devour();
      if(has(/\//)) {
        devour();
        emit(NROOT);
      } else {
        emit(CARROT);
    }
    } else if (has(/\//)) {
      devour();
      emit(DIVIDE);
    } else if (has(/\d/)) {
      while (has(/\d/)) {
        devour();
      }
      if(has(/b/)){
        skip();
        if(tokenSoFar.match(/^[01]+$/)){
          emit(BITSTRING);
        } else {
          throw 'bitstring is not in the correct binary format: [' + tokenSoFar + ']';
        }
      } else if (has(/\./)) {
        devour();
        while(has(/\d/)){
          devour();
        }
        emit(DECIMAL);
      } else {
        emit(INTEGER);
      }
    } else if (has(/[a-zA-Z]/)) {
      while (has(/[a-zA-Z0-9]/)) {
        devour();
      }

      if(tokenSoFar == 'if') {
        emit(IF);
      } else if(tokenSoFar == 'else'){
        emit(ELSE);
      } else if(tokenSoFar == 'done'){
        emit(DONE);
      } else if(tokenSoFar == 'while'){
        emit(WHILE);
      } else if(tokenSoFar == 'printbits') {
        emit(PRINTBITS);
      } else if(tokenSoFar == 'print'){
        emit(PRINT);
      } else if(tokenSoFar == 'flip'){
        emit(FLIP);
      } else if(tokenSoFar == 'and'){
        emit(AND);
      } else if(tokenSoFar == 'or') {
        emit(OR);
      } else if(tokenSoFar == 'then'){
        emit(THEN);
      } else if(tokenSoFar == 'define') {
        emit(DEFINE);
      } else if(tokenSoFar == 'xor') {
        emit(XOR);
      } else if(tokenSoFar == 'null') {
        emit(NULL);
      } else if(tokenSoFar == 'FILE') {
        emit(FILE);
      } else if(tokenSoFar == 'true' || tokenSoFar == 'false'){
        emit(BOOL);
      } else if(tokenSoFar == 'send'){
        emit(SEND);
      } else {
        emit(IDENTIFIER)
      }
    } else if (has(/#/)){
      devour();
      while (has(/[^\n]/)){
        devour();
      }
      tokenSoFar = '';
    } else if (has(/\s/)) {
      devour();
      tokenSoFar = '';
    } else {
      devour();
      throw 'unknown token: [' + tokenSoFar + ']';
    }
  }

  emit(EOF);
  return tokens;
}
