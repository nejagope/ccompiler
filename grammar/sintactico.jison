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

%start S

%%

S : SENTS eof {{ return $1 }};

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
    DECLARACION ptoComa {{ $$ = $1 }}
    | ASIGNACION ptoComa {{ $$ = $1 }}
    ;

DECLARACION : 
    TIPO IDS {{
        $$ = { type: 'DCL', children: [$1, $2] }
    }}
;

ASIGNACION :
    ASIGNABLE asigna E {{
        $$ = { type: '=', children: [$1, $3] }
    }}
;

ASIGNABLE :
    id {{ $$ = {type: 'id', val: yytext } }}
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

IDS : 
    IDS coma id
        {{ 
            var arr = $1.children; 
            var arr2 = arr.concat($3); 
            $1.children = arr2; 
            $$ = $1;  
        }}
    | id 
        {{  $$ = { type: 'IDS', children: [$1] } }}
;

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
    | id {{             
            $$ = {type: 'id', val: yytext } 
        }}
    ;


/*
COLTYPE : increments
            {{$$ = {type: 'coltype', val: 'increments' } }}
        | cadena
            {{$$ = {type: 'coltype', val: 'string' } }}
        | mediumText
            {{$$ = {type: 'coltype', val: 'mediumText' } }}
        | entero
            {{$$ = {type: 'coltype', val: 'integer' } }}
        | booleano
            {{$$ = {type: 'coltype', val: 'boolean' } }}
        | date
            {{$$ = {type: 'coltype', val: 'date' } }}
        | datetime
            {{$$ = {type: 'coltype', val: 'datetime' } }}
        | timestamp
            {{$$ = {type: 'coltype', val: 'timestamp' } }}
        | float
            {{$$ = {type: 'coltype', val: 'float' } }}
        | decimal
            {{$$ = {type: 'coltype', val: 'decimal' } }}
        | timestamps
            {{$$ = {type: 'coltype', val: 'timestamps' } }}
        | remembertoken
            {{$$ = {type: 'coltype', val: 'remembertoken' } }}
        | softdeletes
            {{$$ = {type: 'coltype', val: 'softdeletes' } }}        
        ;

EXPS : EXPS coma E 
            {{ var arr = $1.children; var arr2 = arr.concat($3); $1.children = arr2; $$ = $1;  }}
    | E {{  $$ = { type: 'expressions', children: [$1] } }}
    ; 

E : booleanoLit   {{ $$ = yytext.toLowerCase() == 'true' }}
    | enteroLit     {{ $$ = parseInt(yytext) }}
    | decimalLit    {{ $$ = parseFloat(yytext) }}
    | CADENA     {{ $$ = $1 }}    
    ;


CADENA : cadenaLit {{$$ = yytext }};

*/