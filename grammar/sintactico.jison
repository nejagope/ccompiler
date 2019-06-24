%{    
    var valor, size, simbolo;
%}

%locations

%left menor menorI mayor mayorI igual noIgual
%left or
%left and
%left NOT 

%left mas menos
%left por div mod
%left pow
%left UMINUS

%left THEN
%left sino

%start S

%%

S : STATEMENTS eof {{ return $1 }};

STATEMENTS : 
    STATEMENTS STATEMENT {{ 
            var arr = $1.children; 
            var arr2 = arr.concat($2); 
            $1.children = arr2; 
            $$ = $1;  

            if ($2.type == 'dcl')
                size = $2.size;
            else
                size = 0;
            $$.size += size;
        }}
|   STATEMENT {{  
        if ($1.type == 'dcl')
            size = $1.size;
        else
            size = 0;
        $$ = { type: 'stmnts', size: size, children: [$1], line: @1.first_line, column: @1.first_column } 
    }}
;

STATEMENT:
    DECL ptoComa {{ $$ = $1}}
|   METODO {{ $$ = $1 }}
|   error ptoComa {{       
        $$ = { type: 'error', msj: 'Syntax error', line: @1.first_line, column: @1.first_column };        
    }}
|   error llaveC {{       
        $$ = { type: 'error', msj: 'Syntax error', line: @1.first_line, column: @1.first_column };        
    }}
;

BLOQUE_SENTS :
    BLOQUE_DELIMITADO {{
        $$ = $1;        
    }}
|   SENT {{  
        $$ = { type: 'sents', size: $1.size, children: [$1], line: @1.first_line, column: @1.first_column } 
    }}
;

BLOQUE_DELIMITADO :
    llaveA SENTS llaveC{{
        $$ = $2;        
    }}
|   llaveA llaveC {{  
        $$ = { type: 'sents', size: 0, line: @1.first_line, column: @1.first_column } 
    }}
;

SENTS : 
    SENTS SENT
        {{ 
            var arr = $1.children; 
            var arr2 = arr.concat($2); 
            $1.children = arr2; 
            $$ = $1;  
            $$.size += $2.size;
        }}
    | SENT
        {{  $$ = { type: 'sents', size: $1.size, children: [$1], line: @1.first_line, column: @1.first_column } }}
;

SENT : 
    DECL ptoComa {{ $$ = $1 }}
|   ASIGNACION ptoComa {{ $$ = $1}}
|   IF {{ $$ = $1 }}
|   WHILE {{ $$ = $1 }}
|   RETURN ptoComa {{ $$ = $1 }}
|   CALL ptoComa {{ $$ = $1 }}
|   romper ptoComa {{ $$ = {'type': 'break'} }}
|   continuar ptoComa {{ $$ = {'type': 'continue'} }}
|   error ptoComa {{       
        $$ = { type: 'error', msj: 'Syntax error', line: @1.first_line, column: @1.first_column };        
    }}
|   error llaveC {{       
        $$ = { type: 'error', msj: 'Syntax error', line: @1.first_line, column: @1.first_column };        
    }}
;

CALL :
    ID parenA ARGS parenC {{
        $$ = { type: 'call', size: 0, children: [$1, $3], id: $1, args:$3, line: @1.first_line, column: @1.first_column}
    }}
|   ID parenA parenC {{
        $$ = { type: 'call', size: 0, children: [$1], id: $1, line: @1.first_line, column: @1.first_column }
    }}
;

ARGS : 
    ARGS coma E {{ 
        var arr = $1.children; 
        var arr2 = arr.concat($3); 
        $1.children = arr2; 
        $$ = $1;  
        $$.size = $1.size + 1;
    }}
|   E {{
        $$ = { type: 'args', size: 1, children: [$1], line: @1.first_line, column: @1.first_column }
    }} 
;

RETURN :
    retornar E {{
        $$ = { type: 'return', size: 0, children: [$2], line: @1.first_line, column: @1.first_column }
    }}
|   retornar {{
        $$ = { type: 'return', size: 0, line: @1.first_line, column: @1.first_column }
    }}
;

METODO:
    TIPO ID parenA PARAMS parenC BLOQUE_DELIMITADO {{  
        $$ = { type: 'metodo', return_type: $1, id: $2, size: $4.size, children: [$1, $2, $4, $6], params: $4, body:$6, line: @1.first_line, column: @1.first_column }         
    }}
|   TIPO ID parenA parenC BLOQUE_DELIMITADO {{  
        $$ = { type: 'metodo', return_type: $1, id: $2, size: 0, children: [$1, $2, $5], body:$5, line: @1.first_line, column: @1.first_column }                
    }}
|   void ID parenA PARAMS parenC BLOQUE_DELIMITADO {{  
        $$ = { type: 'metodo', id: $2, return_type: { type: 'tipo', val: 'void' }, size: $4.size, children: [$2, $4, $6], params: $4, body:$6 , line: @1.first_line, column: @1.first_column}         
    }}
|   void ID parenA parenC BLOQUE_DELIMITADO {{          
        $$ = { type: 'metodo', id: $2, return_type: { type: 'tipo', val: 'void' }, size: 0, children: [$2, $5], body:$5, line: @1.first_line, column: @1.first_column }                
    }}
;

PARAMS: 
    PARAMS coma PARAM {{ 
        var arr = $1.children; 
        var arr2 = arr.concat($3); 
        $1.children = arr2; 
        $$ = $1;  
        $$.size = $1.size + 1;
    }}
|   PARAM {{
        $$ = { type: 'params', size: 1, children: [$1], line: @1.first_line, column: @1.first_column }
    }} 
;

PARAM:
    TIPO ID {{  $$ = { type: 'param', data_type: $1, id: $2, line: @1.first_line, column: @1.first_column } }}
;


WHILE :
    mientras parenA E parenC BLOQUE_SENTS {{
        $$ = { type:'while', size: 0, children: [$3, $5], cond: $3, body: $5, line: @1.first_line, column: @1.first_column }
    }}
;

IF: 
    si parenA E parenC BLOQUE_SENTS %prec THEN {{
        $$ = { type:'if', size: 0, children: [$3, $5],  cond: $3, body: $5, line: @1.first_line, column: @1.first_column }
    }}
|   si parenA E parenC BLOQUE_SENTS sino BLOQUE_SENTS {{
        $$ = { type:'if', size: 0, children: [$3, $5, $7], cond: $3, body: $5, body_else: $7, line: @1.first_line, column: @1.first_column }
    }}
    
;

DECL : 
    DECL coma DECL_SUBJECT {{ 
        var arr = $1.children; 
        var arr2 = arr.concat($3); 
        $1.children = arr2; 
        $$ = $1;  
        $$.size = $1.size + 1;
    }}
|   TIPO DECL_SUBJECT {{
        $$ = { type: 'dcl', data_type: $1, size: 1, children: [$2], line: @1.first_line, column: @1.first_column }
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
        $$ = { type: 'tipo', val: 'int', line: @1.first_line, column: @1.first_column }
    }}
    | float  {{
        $$ = { type: 'tipo', val: 'float', line: @1.first_line, column: @1.first_column }
    }}
    | booleano  {{
        $$ = { type: 'tipo', val: 'bool', line: @1.first_line, column: @1.first_column }
    }}
;

ASIGNACION_ID :
    ID asigna E {{
        $$ = { type: '=', size: 0, children: [$1, $3], line: @2.first_line, column: @2.first_column }
    }}
;

ASIGNACION :
    ASIGNACION_ID {{
        $$ = $1;        
    }} 
;

ID : id {{  $$ = { type: 'id', val: $1, line: @1.first_line, column: @1.first_column } }} ;

E
    : E and E {{                       
            $$ = { type: '&&', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E or E {{                       
            $$ = { type: '||', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E menorI E {{                       
            $$ = { type: '<=', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E mayorI E {{                       
            $$ = { type: '>=', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E menor E {{                       
            $$ = { type: '<', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E mayor E {{                       
            $$ = { type: '>', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E noIgual E {{                       
            $$ = { type: '!=', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E igual E {{                       
            $$ = { type: '==', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E mas E
        {{                       
            $$ = { type: '+', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E menos E {{                       
            $$ = { type: '-', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E por E{{                       
            $$ = { type: '*', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E div E {{                       
            $$ = { type: '/', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E mod E {{                       
            $$ = { type: '%', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | E pow E {{                       
            $$ = { type: '^', children: [$1, $3], line: @2.first_line, column: @2.first_column } 
        }}
    | menos E %prec UMINUS {{                       
            $$ = { type: '(-)', children: [$2], line: @1.first_line, column: @1.first_column } 
        }}
    | not E %prec NOT {{                       
            $$ = { type: '!', children: [$2], line: @1.first_line, column: @1.first_column } 
        }}
    | parenA E parenC
        {{ $$ = $2; }}
    | boolLit   {{ 
            valor = yytext.toLowerCase() == 'true'; 
            $$ = { type: 'boolLit', val: valor, line: @1.first_line, column: @1.first_column } 
        }}
    | intLit {{ 
            valor = parseInt(yytext);
            $$ = { type: 'intLit', val: valor, line: @1.first_line, column: @1.first_column } 
        }}
    | floatLit {{ 
            valor = parseFloat(yytext);
            $$ = { type: 'floatLit', val: valor, line: @1.first_line, column: @1.first_column } 
        }}
    | stringLit {{ 
            valor = yytext;
            $$ = { type: 'stringLit', val: valor, line: @1.first_line, column: @1.first_column } 
        }}
    | ID {{             
            $$ = $1; 
        }}
    | CALL {{
        $$ = $1; 
    }}
    ;