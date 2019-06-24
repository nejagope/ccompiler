function SymbolsTable(){
    
    this.symbols = [];

    this.add = function (newSymbol, checkExistence, onSuccess, onError){
        
        let addSymbol = true;

        if (checkExistence){
            if (this.find(newSymbol) != null){
                addSymbol = false;
                
                if (onError)
                    onError(newSymbol);
            }
        }
        
        if (addSymbol){
            this.symbols.push(newSymbol);
            if (onSuccess)
                onSuccess(newSymbol);
        }

    };

    this.remove = function(symbol, onSuccess){
        
        if (this.find(symbol)){

            this.symbols = symbols.filter(function(sym){
                return  symbol.id != symbolId
                        || symbol.type != type
                        || symbol.context != context;
            });

            if (onSuccess)
                onSuccess();
        }
    }

    this.pop = function(onSuccess){
        let symbol = null;
        
        if (symbols.length > 0){

            symbol = symbols.pop();
            if (onSuccess())
                onSuccess();
        }
        return symbol;
    };

    this.findSymbol = function(symbol){
        return this.find(simbol.id, symbol.type, symbol.context);
    };

    this.find = function (symbolId, type, context){
        
        let symbolFound = null;

        this.symbols.forEach(function(symbol){
            if ( symbolFound == null
                        && symbol.id == symbolId
                        && symbol.type == type
                        && symbol.context == context)
            {
                    symbolFound = symbol;
            }        
        });

        return symbolFound;
    };

}