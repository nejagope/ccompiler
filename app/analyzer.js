
function analyzeAST(ast){    

    //errors table
    var errs = []; 
    
    //symbols table
    var ts = {
        symbols: [],

        add: function (newSymbol, errs){
            let symbolExists = false;
            
            this.symbols.forEach(function(symbol){
                if (symbol.id == newSymbol.id
                    && ( symbol.type == 'param' && (newSymbol.type == 'param' || newSymbol.type == 'var') || symbol.type == newSymbol.type)
                    && !(symbol.ambito == 'global' && newSymbol.type == 'var')            
                    ){
                        symbolExists = true;
                        return false;
                }        
            });

            if (symbolExists){
                errs.push({
                    type: 'error', msj: 'identifier already declared: ' + newSymbol.id
                });
            }else{
                this.symbols.push(newSymbol);
            }
        },

        pop: function(){
            if (this.symbols.length > 0)
                return this.symbols.pop();
            return null;
        },

        find: function (id, type){
            let symbolFound = null;
            
            this.symbols.forEach(function(symbol){
                if (symbol.id == id && symbol.type == type) {
                    symbolFound = symbol;                
                }        
            });
            return symbolFound;
        }                
    }; 
    
    var ambito = 'global';            
    analyze(ast, ts, errs, ambito);        
    return {ts: ts, errs: errs };
}

function analyze(ast, ts, errs, ambito){
    var symbol, id;
    
    switch (ast.type){
        
        case 'stmnts':
        case 'sents':               
            ast.children.forEach(function(stmnt, i, ast){
                analyze(stmnt, ts, errs, ambito);
            }, ast);  
            if (ast.type == 'sents'){                
                for (i = 0; i < (ast.size); i++)
                    ts.pop();
            }
            break;
        
        case 'dcl':            
            ast.children.forEach(function(dcl, i, ast){
                if (dcl.type == "="){
                    id = dcl.children[0].val;
                }else if (dcl.type == "id"){
                    id = dcl.val;
                }
                symbol = {
                    id : id,
                    type: 'var',
                    data_type: this.data_type.val, 
                    ambito: ambito
                };                
                ts.add(symbol, errs);
            }, ast);
            break;

        case 'metodo':
            symbol = {
                id : ast.id.val,
                type: 'metodo',
                return_type: ast.return_type.val,
                data_type: ast.return_type.val,                    
                size: ast.size,
                ambito: ambito
            };
            
            ts.add(symbol, errs);
            
            if (ast.params){
                analyze(ast.params, ts, errs, 'metodo:' + symbol.id);
            }
            analyze(ast.body, ts, errs, 'metodo:' + symbol.id);            
            
            
            for (i = 0; i < (symbol.size); i++)
                ts.pop();
            break;

        case 'params':
            ast.children.forEach(function(param, i, ast){                
                symbol = {
                    id : param.id.val,
                    type: 'param',
                    data_type: param.data_type.val,                    
                    position: i,
                    ambito: ambito
                };                
                ts.add(symbol, errs);
            }, ast);
            break;

        case '=':
            let asignando = ast.children[0];
            if (asignando.type == 'id'){
                symbol = ts.find(asignando.val, 'var');
                if (!symbol)
                    symbol = ts.find(asignando.val, 'param');
                
                if (!symbol){
                    errs.push({
                        type: 'error', msj: 'identifier has not been declared: ' + asignando.val
                    });
                }
            }
            break;

        case 'error':
            errs.push(ast);
            break;

        default:
            if (ast.body){                
                analyze(ast.body, ts, errs, ambito + ':' + ast.type);                
            }                        
    }
}