var idAmbito;


function analyzeAST(ast){
    var ts = [], errs = []; 
    idAmbito = 0;
    var ambito = [idAmbito];            
    analyze(ast, ts, errs, ambito);
    
    console.log(ts);
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
            ast.ambito = ambito.slice(0);          
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
                    ambito: ambito.slice(0)                   
                };                
                ts.push(symbol);
            }, ast);
            break;

        case 'metodo':
            symbol = {
                id : ast.id.val,
                type: 'metodo',
                return_type: ast.return_type.val,
                data_type: ast.return_type.val,                    
                size: ast.size,
                ambito: ambito.slice(0)
            };
            ts.push(symbol);
            idAmbito++;
            ambito.push(idAmbito);

            if (ast.params){
                analyze(ast.params, ts, errs, ambito);
            }
            analyze(ast.body, ts, errs, ambito);
            ambito.pop();
            break;

        case 'params':
            ast.children.forEach(function(param, i, ast){                
                symbol = {
                    id : param.id.val,
                    type: 'param',
                    data_type: param.data_type.val,                    
                    position: i,
                    ambito: ambito.slice(0)
                };                
                ts.push(symbol);
            }, ast);
            break;

        default:
            if (ast.body){
                idAmbito++;
                ambito.push(idAmbito);
                analyze(ast.body, ts, errs, ambito);
                ambito.pop();
            }                        
    }
}