function compile(ast, onAddSymbolSuccess, onAddSymbolError){    
    //will contain errors generated while compiling
    let errs = [];
    //symbols table
    let ts = new SymbolsTable();

    //assign ids to nodes
    _node_id = 0;
    addNodeIDs(ast);       

    //fill symbols table
    fillSymbolsTable(ast, "global", ts, errs, onAddSymbolSuccess, function(symbol){        
        errs.push({error: 'Identificador ya declarado', line: symbol.line, column: symbol.column, id: symbol.id});
    });

    return {ts: ts, errs: errs};
}

/** --------------Assign ids to ast nodes -------------- */
var _node_id = 0;

function addNodeIDs(ast){
    ast.nid = _node_id++;
    if (ast.children){
        ast.children.forEach(function(child){
            addNodeIDs(child);
        });
    }
}

/** ------------ Symbols table definition ---------------- */
function SymbolsTable(){
    
    this.symbols = [];

    this.add = function (newSymbol, checkExistence, onSuccess, onError){
        
        let addSymbol = true;

        if (checkExistence){
            let symbolFound = this.findSymbol(newSymbol);
            if (symbolFound != null){
                
                if (symbolFound.rol == 'global_var'){
                    addSymbol = newSymbol.context != symbolFound.context;
                }
                else if (symbolFound.type == 'metodo'){
                    addSymbol = newSymbol.paramTypes != symbolFound.paramTypes;
                }
                else{
                    addSymbol = false;
                }                

                if (!addSymbol && onError)
                    onError(newSymbol);
            }
        }
        
        if (addSymbol){
            if (newSymbol.context == 'global' && newSymbol.type == 'var')
                newSymbol.rol = 'global_var';

            if (newSymbol.id == 'main' && newSymbol.type == 'metodo')
                newSymbol.rol = 'main';

            this.symbols.push(newSymbol);
            if (onSuccess)
                onSuccess(newSymbol);
        }

    };

    this.remove = function(symbol){

        let symbolFound = this.find(symbol);
        
        if (symbolFound){

            this.symbols = symbols.filter(function(sym){
                return  symbol.id != symbolId
                        || symbol.type != type
                        || symbol.context != context;
            });          
        }

        return symbolFound;
    }

    this.pop = function(){
        let symbol = null;
        
        if (symbols.length > 0){

            symbol = symbols.pop();
        }
        return symbol;
    };

    this.findSymbol = function(symbol){
        return this.find(symbol.id, symbol.type, symbol.context);
    };

    this.find = function (symbolId, type, context){
        
        let symbolFound = null;
        
        this.symbols.forEach(function(symbol){
            if ( symbolFound == null
                        && symbol.id == symbolId
                        && symbol.type == type
                        && context.indexOf(symbol.context) == 0)
            {
                    symbolFound = symbol;
            }        
        });        
        return symbolFound;
    };

}


function fillSymbolsTable(ast, context, ts, errs, onAddSymbolSuccess, onAddSymbolError){
    var symbol, id;
    
    switch (ast.type){
        
        case 'stmnts':
            if (!ast.children)
                return;    

            ast.children.forEach(function(stmnt, i){
                fillSymbolsTable(stmnt, context, ts, errs, onAddSymbolSuccess, onAddSymbolError);
            });  
            break;

        case 'sents': 
            if (!ast.children)
                return;              
            ast.children.forEach(function(sent, i){                
                fillSymbolsTable(sent, context, ts, errs, onAddSymbolSuccess, onAddSymbolError);
            });  
            break;
        
        case 'dcl':            
            ast.children.forEach(function(dcl, i){
                if (dcl.type == "="){
                    id = dcl.children[0].val;
                }else if (dcl.type == "id"){
                    id = dcl.val;
                }
                symbol = {
                    id : id,
                    type: 'var',
                    rol: 'var',
                    data_type: this.data_type.val, 
                    context: context,
                    line : dcl.line,
                    column : dcl.column,
                };                
                ts.add(symbol, true, onAddSymbolSuccess, onAddSymbolError);
            }, ast);
            break;

        case 'metodo':
            symbol = {
                id : ast.id.val,
                type: 'metodo',
                return_type: ast.return_type.val,
                data_type: ast.return_type.val,                    
                size: ast.size,
                context: context,
                body: ast.body,     
                rol: 'metodo',    
                line : ast.line,
                column : ast.column,       
            };
            if (ast.params){
                symbol.params = ast.params  
                symbol.paramTypes = '';              
            }
            
            ts.add(symbol, true, onAddSymbolSuccess, onAddSymbolError);
            
            let metodoContext = context + '_' + ast.nid + '_' + symbol.id;
            
            if (ast.params){
                if (ast.params.children){
                    //el contexto incluye los tipos de dato de los parámetros
                    ast.params.children.forEach(function(param, i){  
                        metodoContext += "-" + param.data_type.val;           
                        symbol.paramTypes += "-" + param.data_type.val;
                    });

                    symbol.bodyContext = metodoContext;
                }     
                                       
                fillSymbolsTable(ast.params, metodoContext, ts, errs, onAddSymbolSuccess, onAddSymbolError);                
            }
            
            fillSymbolsTable(ast.body, metodoContext, ts, errs, onAddSymbolSuccess, onAddSymbolError);
            
            break;

        case 'params':
            ast.children.forEach(function(param, i){                
                symbol = {
                    id : param.id.val,
                    type: 'var',
                    data_type: param.data_type.val,                    
                    position: i,
                    context: context,
                    rol: 'param',
                    line : param.line,
                    column : param.column,
                };                
                ts.add(symbol, true, onAddSymbolSuccess, onAddSymbolError);
            }, ast);
            break;

        case 'error':
            errs.push(ast);
            break;

        case 'while':
        case 'if':                
                if (ast.children){
                    ast.children.forEach(function(child, i){                
                        fillSymbolsTable(child, context + "_" + ast.type + ast.nid, ts, errs, onAddSymbolSuccess, onAddSymbolError);                                                                                
                    }, ast);
                } 
                break;
        default:
            if (ast.children){
                ast.children.forEach(function(child, i){                
                    fillSymbolsTable(child, context, ts, errs, onAddSymbolSuccess, onAddSymbolError);                                        
                }, ast);
            }            
    }
}