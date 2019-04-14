%{
    var nid = 0;
    var valor;

    function addChildren(node, child){
      node.splice(2,1,child); 
      return node;
    }    
%}
%locations

%left menor menorI mayor mayorI igual noIgual
%left or
%left and
%left not 

%left mas menos
%left por div mod
%left pow
%left UMINUS

%left THEN
%left sino

%start S

%%

S : SENTS eof {{ return $1 }};

BLOQUE_SENTS :
    llaveA SENTS llaveC{{
        $$ = $2;
    }}
|   SENT {{  
        $$ = { type: 'SENTS', children: [$1] } 
    }}
;

SENTS : 
    SENTS SENT
        {{ 
            var arr = $1.children; 
            var arr2 = arr.concat($2); 
            $1.children = arr2; 
            $$ = $1;  
        }}
    | SENT
        {{  $$ = { type: 'SENTS', children: [$1] } }}
;

SENT : 
    DECL ptoComa {{ $$ = $1 }}
|   ASIGNACION ptoComa {{ $$ = $1 }}
|   IF {{ $$ = $1 }}
;

IF: 
    si parenA E parenC BLOQUE_SENTS %prec THEN {{
        $$ = { type:'if', children: [$3, $5] }
    }}
|   si parenA E parenC BLOQUE_SENTS sino BLOQUE_SENTS {{
        $$ = { type:'if', children: [$3, $5, $7] }
    }}
    
;

DECL : 
    DECL coma DECL_SUBJECT {{ 
        var arr = $1.children; 
        var arr2 = arr.concat($3); 
        $1.children = arr2; 
        $$ = $1;  
    }}
|   TIPO DECL_SUBJECT {{
        $$ = { type: 'DCL', children: [$1, $2] }
    }} 
;

DECL_SUBJECT : 
    ID {{
        $$ = $1;
    }}
|   ASIGNACION_ID {{
        $$ = $1;
    }} 
;

TIPO : entero  {{
        $$ = { type: 'TIPO', val: 'int' }
    }}
    | float  {{
        $$ = { type: 'TIPO', val: 'float' }
    }}
    | booleano  {{
        $$ = { type: 'TIPO', val: 'bool' }
    }}
;

ASIGNACION_ID :
    ID asigna E {{
        $$ = { type: '=', children: [$1, $3] }
    }}
;

ASIGNACION :
    ASIGNACION_ID {{
        $$ = $1;
    }} 
;

ID : id {{  $$ = { type: 'ID', val: $1 } }} ;

E
    : E mas E
        {{                       
            $$ = {type: '+', children: [$1, $3] } 
        }}
    | E menos E {{                       
            $$ = {type: '-', children: [$1, $3] } 
        }}
    | E por E{{                       
            $$ = {type: '*', children: [$1, $3] } 
        }}
    | E div E {{                       
            $$ = {type: '/', children: [$1, $3] } 
        }}
    | E pow E {{                       
            $$ = {type: '^', children: [$1, $3] } 
        }}
    | menos E %prec UMINUS {{                       
            $$ = {type: '-', children: [$2] } 
        }}
    | parenA E parenC
        {{ $$ = $2; }}
    | boolLit   {{ 
            valor = yytext.toLowerCase() == 'true'; 
            $$ = {type: 'boolLit', val: valor } 
        }}
    | intLit {{ 
            valor = parseInt(yytext);
            $$ = {type: 'intLit', val: valor } 
        }}
    | floatLit {{ 
            valor = parseFloat(yytext);
            $$ = {type: 'floatLit', val: valor} 
        }}
    | stringLit {{ 
            valor = yytext;
            $$ = {type: 'stringLit', val: valor } 
        }}
    | ID {{             
            $$ = $1; 
        }}
    ;