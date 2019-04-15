%{
    var nid = 0;
    var valor, size;

    var ts = [];    //tabla de símbolos
    var errs = []; //tabla de errores

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

S : STATEMENTS eof {{ return {ast: $1, ts: ts, errs: errs } }};

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
        $$ = { type: 'stmnts', size: size, children: [$1] } 
    }}
;

STATEMENT:
    DECL ptoComa {{ $$ = $1}}
|   METODO {{ $$ = $1 }}
;

BLOQUE_SENTS :
    BLOQUE_DELIMITADO {{
        $$ = $1;        
    }}
|   SENT {{  
        $$ = { type: 'sents', size: $1.size, children: [$1] } 
    }}
;

BLOQUE_DELIMITADO :
    llaveA SENTS llaveC{{
        $$ = $2;        
    }}
|   llaveA llaveC {{  
        $$ = { type: 'sents', size: 0 } 
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
        {{  $$ = { type: 'sents', size: $1.size, children: [$1] } }}
;

SENT : 
    DECL ptoComa {{ $$ = $1 }}
|   ASIGNACION ptoComa {{ $$ = $1}}
|   IF {{ $$ = $1 }}
|   WHILE {{ $$ = $1 }}
|   RETURN ptoComa {{ $$ = $1 }}
;

RETURN :
    retornar E {{
        $$ = { type: 'return', size: 1, children: [$2] }
    }}
|   retornar {{
        $$ = { type: 'return', size: 0 }
    }}
;

METODO:
    TIPO ID parenA PARAMS parenC BLOQUE_DELIMITADO {{  
        $$ = { type: 'metodo', return_type: $1, id: $2, size: $4.size, params: $4, body:$6 } 
    }}
|   TIPO ID parenA parenC BLOQUE_DELIMITADO {{  
        $$ = { type: 'metodo', return_type: $1, id: $2, size: $5.size, body:$5 }        
    }}
|   void ID parenA PARAMS parenC BLOQUE_DELIMITADO {{  
        $$ = { type: 'metodo', id: $2, size: $4.size, params: $4, body:$6 } 
    }}
|   void ID parenA parenC BLOQUE_DELIMITADO {{          
        $$ = { type: 'metodo', id: $2, size: $5.size, body:$5 }        
    }}}
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
        $$ = { type: 'params', size: 1, children: [$1] }
    }} 
;

PARAM:
    TIPO ID {{  $$ = { type: 'param', data_type: $1, id: $2 } }}
;


WHILE :
    mientras parenA E parenC BLOQUE_SENTS {{
        $$ = { type:'while', size: 0, cond: $3, body: $5 }
    }}
;

IF: 
    si parenA E parenC BLOQUE_SENTS %prec THEN {{
        $$ = { type:'if', size: 0, cond: $3, body: $5 }
    }}
|   si parenA E parenC BLOQUE_SENTS sino BLOQUE_SENTS {{
        $$ = { type:'if', size: 0, cond: $3, body: $5, body_else: $7 }
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
        $$ = { type: 'dcl', data_type: $1, size: 1, children: [$2] }
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
        $$ = { type: 'tipo', val: 'int' }
    }}
    | float  {{
        $$ = { type: 'tipo', val: 'float' }
    }}
    | booleano  {{
        $$ = { type: 'tipo', val: 'bool' }
    }}
;

ASIGNACION_ID :
    ID asigna E {{
        $$ = { type: '=', size: 0, children: [$1, $3] }
    }}
;

ASIGNACION :
    ASIGNACION_ID {{
        $$ = $1;        
    }} 
;

ID : id {{  $$ = { type: 'id', val: $1 } }} ;

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