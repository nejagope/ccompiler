%options case-insensitive

%x ML_COMMENT
%x STRING

%%


// ----------------------------------- comentario multilinea -------------------------------------

"/*"                    { this.pushState('ML_COMMENT'); }
<ML_COMMENT>"*/"        { this.popState(); }
<ML_COMMENT><<EOF>>		{ throw "Final inesperado de archivo (comentario no cerrado)"; }
<ML_COMMENT>.          	/* Se ignora todo */
// --------------------------------- fin comentario multilinea -----------------------------------

// ----------------------------------- strings comillas dobles -------------------------------------

\"                  { this.pushState('STRING'); limpiarString(); }
<STRING>\"          { 
						this.popState(); 
						yytext=getString(); 
						return 'stringLit'; 
					}
<STRING>.        	{ appendString(yytext); }
<STRING><<EOF>>     { appendString(yytext); yytext=getString(); return 'errorLex'; }

// --------------------------------- fin string comillas dobles -----------------------------------


"//"[^\n\r]*                   /* ignorar comentario de línea */

\s+                         /* skip whitespace */
[0-9]+("."[0-9]+)\b         return 'floatLit'
[0-9]+                      return 'intLit'

/*-------------------------------------------- PALABRAS RESERVADAS ----------------------------------*/

"true"  return 'boolLit'
"false" return 'boolLit'
"bool"	return 'booleano'
"int"	return 'entero'
"float"	return 'float'
"void"  return 'void'

"for" 		return '_for'
"while" 	return 'mientras'
"if" 		return 'si'
"else" 		return 'sino'
"break" 	return '_break'
"continue" 	return '_continue'
"return" 	return '_return'

/*-------------------------------------------- FIN PALABRAS RESERVADAS ------------------------------*/

[a-zA-Z_][a-zA-Z0-9_]*   return 'id'

"->"  return 'accesor'

"{"     return 'llaveA'
"}"     return 'llaveC'
"("     return 'parenA'
")"     return 'parenC'
"["     return 'bracketA'
"]"     return 'bracketC'

","     return 'coma'
";"     return 'ptoComa'
"."	    return 'pto'

"+"	return 'mas'
"-" return 'menos'
"*" return 'por'
"/" return 'div'
"^" return 'pow'
"%" return 'mod'

">=" return 'mayorI'
"<=" return 'menorI'
"==" return 'igual'
"!=" return 'noIgual'
">"  return 'mayor'
"<"  return 'menor'

"&&" return 'and'
"||" return 'or'
"!" return 'not'

"="	return 'asigna'

.  		return 'errorLex'
<<EOF>> return 'eof'


%%

var string = "";
function limpiarString(){
  string="";
}
function appendString(char){
  string = string + char;
}
function getString(){
  return string;
}
