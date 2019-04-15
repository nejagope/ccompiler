

function analyzeAST(ast){
    var ts = [], errs = [];            
    analyze(ast, ts, errs);
    return {ts: ts, errs: errs };
}


function analyze(ast, ts, errs){
    var symbol, id;
    
    switch (ast.type){
        
        case 'stmnts':
            ast.children.forEach(function(stmnt, i, ast){
                analyze(stmnt, ts, errs);
            }, ast);
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
                };                
                ts.push(symbol);
            }, ast);
            break;
    }
}