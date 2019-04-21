var stack, heap, p, ts;

const COUT_FUNCTION_ID = 'printf';
const COMPLETED = '$$completed$$';
const RETURN = '$$return$$';
const CONTINUE = '$$continue$$';
const BREAK = '$$break$$';

function run(_ts, cout){
    stack = [];
    heap = [];
    p = 0;    
    ts = _ts;
    
    let mainMethod = ts.findMethod('main', 0);
    if (mainMethod){        
        let params = ts.findByAmbito('param', 'metodo:main');        
        params.forEach(param => {
            p.push(null);            
        });        
        execute(mainMethod.body, ts, cout, 'metodo:main');        
    }else{
        cout('Not main method found');        
    }
}

function execute(ast, ts, cout, ambito){
    let val, symbol, pos, type;
    console.log('-------------------------')
    console.log('ambito:' + ambito)
    
    console.log('ts:')
    ts.cout();
    
    console.log('stack')
    console.log(stack);
    console.log('p: ' + p)        

    console.log('sentencia a ejecutar: ' + ast.type)
    
    //alert(ast.type);

    switch(ast.type){
        case 'sents':  
            let localVarsDeclared = 0;
            val = COMPLETED;

            if (ast.children){      
                
                ast.children.forEach(function(child){
                    
                    if (val != RETURN && val != BREAK && val != CONTINUE){ 
                        
                        val = execute(child, ts, cout, ambito); 
                        
                        if (child.type == 'dcl')
                            localVarsDeclared += child.size;                        
                    }

                });

                for (i = 0; i< localVarsDeclared; i++){
                    ts.pop();
                    stack.pop();                    
                }
            }
            return val;

        case 'if':
            val = execute(ast.cond, ts, cout, ambito)            
            if (val){
                val = execute(ast.body, ts, cout, ambito);
            }else if (ast.body_else){
                val = execute(ast.body_else, ts, cout, ambito);
            }
            return val;

        case 'while':
            while(execute(ast.cond, ts, cout, ambito)){
                val = execute(ast.body, ts, cout, ambito);
                
                if (val == BREAK || val == RETURN){                    
                    break;
                }
            }
            if (val == BREAK || val == CONTINUE)
                return COMPLETED;                                    
        
            return val;

        case 'break':
            return BREAK;

        case 'continue':
            return CONTINUE;
                    
        case 'return':
            if (ast.children){
                stack[p - 1] = execute(ast.children[0], ts, cout, ambito);
                console.log('se retornará: stack[' + (p-1) + ']')
            }
            return RETURN;            

        case 'dcl':
            type = ast.data_type.val;
            if (ast.children){
                ast.children.forEach(function(element){
                    symbol = {
                        type: 'var',                        
                        ambito: ambito,
                        data_type: type
                    }

                    let symbolsParamAlreadyInAmbito = ts.findByAmbito('param', ambito);
                    let symbolsVarAlreadyInAmbito = ts.findByAmbito('var', ambito);
                    
                    symbol.position = symbolsParamAlreadyInAmbito.length + symbolsVarAlreadyInAmbito.length;
                    
                    stack.push(null);                    
                    
                    if (element.type == 'id'){
                        symbol.id = element.val;                        
                    }
                    else if (element.type == '='){
                        symbol.id = element.children[0].val;                    
                        val = execute(element.children[1], ts, cout, ambito);
                        stack[p + symbol.position] = val;
                    }

                    ts.addVarOrParam(symbol);                    
                });
            }
            return COMPLETED;

        case 'call': 
            let prevP = p;       
            
            if (ast.id.val == COUT_FUNCTION_ID){                
                //función predefinida printf
                val = execute(ast.args.children[0], ts, cout, ambito); 
                cout(val);
            }else{
                
                //TODO función definida por el usuario
                if (ast.args){
                    symbol = ts.findMethod(ast.id.val, ast.args.size);                    
                }else{
                    symbol = ts.findMethod(ast.id.val, 0);                    
                }

                if (symbol){  
                    
                    //agregar a la pila la celda de return
                    stack.push(null);   
                    let stop = stack.length - 1;                                    
                                        
                    if (symbol.params){                        
                        //se agregan a la pila los argumentos de la función
                        symbol.params.children.forEach(function(param, i){                           
                            stack.push(execute(ast.args.children[i], ts, cout, ambito));                                                                                    
                        });

                        //agregar params a la tabla de símbolos
                        symbol.params.children.forEach(function(param, i){
                            
                            let paramSymbol = {
                                id: param.id.val,
                                data_type: param.data_type,
                                position: i,
                                type: 'param',
                                ambito: ambito + '|metodo:' + symbol.id
                            };                            
                            
                            ts.addVarOrParam(paramSymbol);
                        });
                    }

                    //inicio de pila para el bloque del método a ejecutar
                    p = stop + 1;
                      
                    //ejecutar cuerpo del método                    
                    execute(symbol.body, ts, cout, ambito + '|metodo:' + symbol.id); 
                    
                    console.log('stack luego de la ejecución del cuerpo')
                    console.log(stack); 
                                    
                    //eliminar del stack params (tambien de la tabla de simbolos)
                                        
                    if (symbol.params){
                        symbol.params.children.forEach(function(param, i){                                                 
                            console.log('se quita de ts: ' + ts.pop().id);
                            stack.pop();                                                  
                        });
                    }
                    
                    //eliminar del stack celda return 
                    val = stack.pop();
                    console.log('pop ' + val);

                    console.log('stack cuando se restaura el stack después de la invoc del metod')
                    console.log(stack); 

                    //se retorna p a su posición previa a la ejecución del método invocado
                    p = prevP;                    
                    return val;
                }
            }
            break;

        case '=':
            symbol = ts.findVarOrParam(ast.children[0].val, ambito);
            if (!symbol){
                //si no se halla la var en el ambito actual, se busca en el ambito global
                symbol = ts.findVarOrParam(ast.children[0].val, 'global');
            }
            if (symbol.ambito == 'global'){
                symbol.val = execute(ast.children[1], ts, cout, ambito); 
            }else{
                //asignación a var o param
                stack[p + symbol.position] = execute(ast.children[1], ts, cout, ambito); 
            }
            return COMPLETED;

        case 'id':
            console.log('buscando var: ' + ast.val);
            symbol = ts.findVarOrParam(ast.val, ambito);
            if (!symbol){
                //si no se halla la var en el ambito actual, se busca en el ambito global
                symbol = ts.findVarOrParam(ast.val, 'global');
            }
            if (symbol){
                if (symbol.ambito == 'global')
                    return symbol.val;
            }

            console.log(symbol);
            console.log('stack[' + (p+symbol.position) + '] = ' + stack[p + symbol.position]);
            
            return stack[p + symbol.position];

        case '+':
            return execute(ast.children[0], ts, cout, ambito) + execute(ast.children[1], ts, cout, ambito);  
        case '-':
            return execute(ast.children[0], ts, cout, ambito) - execute(ast.children[1], ts, cout, ambito);  
        case '*':
            return execute(ast.children[0], ts, cout, ambito) * execute(ast.children[1], ts, cout, ambito);  
        case '/':
            return execute(ast.children[0], ts, cout, ambito) / execute(ast.children[1], ts, cout, ambito);  
        case '%':
            return execute(ast.children[0], ts, cout, ambito) % execute(ast.children[1], ts, cout, ambito);  
        case '^':
            return Math.pow(execute(ast.children[0], ts, cout, ambito), execute(ast.children[1], ts, cout, ambito));  
        case '(-)':
            return -1 * execute(ast.children[0], ts, cout, ambito);  
        
        case '<':
            return execute(ast.children[0], ts, cout, ambito) < execute(ast.children[1], ts, cout, ambito);  
        case '<=':
            return execute(ast.children[0], ts, cout, ambito) <= execute(ast.children[1], ts, cout, ambito);  
        case '>':
            return execute(ast.children[0], ts, cout, ambito) > execute(ast.children[1], ts, cout, ambito);  
        case '>=':
            return execute(ast.children[0], ts, cout, ambito) >= execute(ast.children[1], ts, cout, ambito);  
        case '==':
            return execute(ast.children[0], ts, cout, ambito) == execute(ast.children[1], ts, cout, ambito);  
        case '!=':
            return execute(ast.children[0], ts, cout, ambito) != execute(ast.children[1], ts, cout, ambito);  
        
        case '!':
            return !execute(ast.children[0], ts, cout, ambito);  
        case '||':
            return execute(ast.children[0], ts, cout, ambito) || execute(ast.children[1], ts, cout, ambito);  
        case '&&':
            return execute(ast.children[0], ts, cout, ambito) && execute(ast.children[1], ts, cout, ambito);  
        
        
        case 'stringLit':
        case 'intLit':
        case 'floatLit':
        case 'boolLit':
            return ast.val;
            
    }
}