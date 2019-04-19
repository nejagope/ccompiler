var stack, heap, p, ts, stop;

const COUT_FUNCTION_ID = 'printf';

function run(_ts, cout){
    stack = [];
    heap = [];
    p = 0;
    stop = 0;
    ts = _ts;
    
    let mainMethod = ts.find('main', 'metodo');
    if (mainMethod){        
        let params = ts.findByAmbito('param', 'metodo:main');        
        params.forEach(param => {
            p.push(null);
            stop ++;
        });        
        execute(mainMethod.body, ts, cout);        
    }else{
        cout('Not main method found');        
    }
}

function execute(ast, ts, cout){
    let val, symbol, pos, type;
    console.log(stack);

    switch(ast.type){
        case 'sents':  
            if (ast.children){      
                ast.children.forEach(function(child){
                    execute(child, ts, cout);
                });
            }
            break;

        case 'dcl':
            type = ast.data_type.val;
            if (ast.children){
                ast.children.forEach(function(element, i){
                    symbol = {
                        type: 'var',
                        position: i,
                        ambito: 'local'
                    }
                    if (element.type == 'id'){
                        symbol.id = element.val;
                        stack.push(null);
                    }
                    else if (element.type == '='){
                        symbol.id = element.children[0].val;
                        val = execute(element.children[1], ts, cout);
                        ts.push(val);
                    }

                    ts.add(symbol);
                });
            }
            break;

        case 'call':            
            if (ast.id.val == COUT_FUNCTION_ID){                
                //función predefinida printf
                val = execute(ast.args.children[0], ts, cout); 
                cout(val);
            }else{
                //TODO función definida por el usuario

            }
            break;

        case '=':
            symbol = ts.findVarOrParam(ast.children[0].val);
            if (symbol.ambito == 'global'){
                symbol.val = execute(ast.children[1], ts, cout); 
            }else{
                //asignación a var o param
                stack[p + symbol.position] = execute(ast.children[1], ts, cout); 
            }
            break;

        case 'id':
            symbol = ts.findVarOrParam(ast.val);
            if (symbol.ambito == 'global')
                return symbol.val;

            return stack[p + symbol.position];
            break;

        case '+':
            return execute(ast.children[0], ts, cout) + execute(ast.children[1], ts, cout);  
        case '*':
            return execute(ast.children[0], ts, cout) * execute(ast.children[1], ts, cout);  
        case '/':
            return execute(ast.children[0], ts, cout) / execute(ast.children[1], ts, cout);  
        case '%':
            return execute(ast.children[0], ts, cout) % execute(ast.children[1], ts, cout);  
        case '^':
            return Math.pow(execute(ast.children[0], ts, cout), execute(ast.children[1], ts, cout));  
        case '(-)':
            return -1 * execute(ast.children[0], ts, cout);  
        
        case '<':
            return execute(ast.children[0], ts, cout) < execute(ast.children[1], ts, cout);  
        case '<=':
            return execute(ast.children[0], ts, cout) <= execute(ast.children[1], ts, cout);  
        case '>':
            return execute(ast.children[0], ts, cout) > execute(ast.children[1], ts, cout);  
        case '>=':
            return execute(ast.children[0], ts, cout) >= execute(ast.children[1], ts, cout);  
        case '==':
            return execute(ast.children[0], ts, cout) == execute(ast.children[1], ts, cout);  
        case '!=':
            return execute(ast.children[0], ts, cout) != execute(ast.children[1], ts, cout);  
        
        case '!':
            return !execute(ast.children[0], ts, cout);  
        case '||':
            return execute(ast.children[0], ts, cout) || execute(ast.children[1], ts, cout);  
        case '&&':
            return execute(ast.children[0], ts, cout) && execute(ast.children[1], ts, cout);  
        
        
        case 'stringLit':
        case 'intLit':
        case 'floatLit':
        case 'boolLit':
            return ast.val;
            
    }
}