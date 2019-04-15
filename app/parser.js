/* parser generated by jison 0.4.18 */
/*
  Returns a Parser object of the following structure:

  Parser: {
    yy: {}
  }

  Parser.prototype: {
    yy: {},
    trace: function(),
    symbols_: {associative list: name ==> number},
    terminals_: {associative list: number ==> name},
    productions_: [...],
    performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate, $$, _$),
    table: [...],
    defaultActions: {...},
    parseError: function(str, hash),
    parse: function(input),

    lexer: {
        EOF: 1,
        parseError: function(str, hash),
        setInput: function(input),
        input: function(),
        unput: function(str),
        more: function(),
        less: function(n),
        pastInput: function(),
        upcomingInput: function(),
        showPosition: function(),
        test_match: function(regex_match_array, rule_index),
        next: function(),
        lex: function(),
        begin: function(condition),
        popState: function(),
        _currentRules: function(),
        topState: function(),
        pushState: function(condition),

        options: {
            ranges: boolean           (optional: true ==> token location info will include a .range[] member)
            flex: boolean             (optional: true ==> flex-like lexing behaviour where the rules are tested exhaustively to find the longest match)
            backtrack_lexer: boolean  (optional: true ==> lexer regexes are tested in order and for each matching regex the action code is invoked; the lexer terminates the scan when a token is returned by the action code)
        },

        performAction: function(yy, yy_, $avoiding_name_collisions, YY_START),
        rules: [...],
        conditions: {associative list: name ==> set},
    }
  }


  token location info (@$, _$, etc.): {
    first_line: n,
    last_line: n,
    first_column: n,
    last_column: n,
    range: [start_number, end_number]       (where the numbers are indexes into the input string, regular zero-based)
  }


  the parseError function receives a 'hash' object with these members for lexer and parser errors: {
    text:        (matched text)
    token:       (the produced terminal token, if any)
    line:        (yylineno)
  }
  while parser (grammar) errors will also provide these members, i.e. parser errors deliver a superset of attributes: {
    loc:         (yylloc)
    expected:    (string describing the set of expected tokens)
    recoverable: (boolean: TRUE when the parser has a error recovery rule available for this particular error)
  }
*/
var parser = (function(){
var o=function(k,v,o,l){for(o=o||{},l=k.length;l--;o[k[l]]=v);return o},$V0=[1,7],$V1=[1,8],$V2=[1,9],$V3=[1,10],$V4=[5,24,33,34,35],$V5=[1,14],$V6=[1,18],$V7=[8,25],$V8=[2,28],$V9=[1,23],$Va=[1,31],$Vb=[1,30],$Vc=[1,32],$Vd=[1,33],$Ve=[1,34],$Vf=[1,35],$Vg=[1,40],$Vh=[1,42],$Vi=[23,25],$Vj=[1,44],$Vk=[1,45],$Vl=[1,46],$Vm=[1,47],$Vn=[1,48],$Vo=[8,23,25,38,39,40,41,42],$Vp=[1,65],$Vq=[1,64],$Vr=[5,15,24,27,29,30,33,34,35,37],$Vs=[15,27,29,33,34,35,37],$Vt=[15,27,29,30,33,34,35,37],$Vu=[8,23,25,38,39],$Vv=[8,23,25,38,39,40,41];
var parser = {trace: function trace() { },
yy: {},
symbols_: {"error":2,"S":3,"STATEMENTS":4,"eof":5,"STATEMENT":6,"DECL":7,"ptoComa":8,"METODO":9,"BLOQUE_SENTS":10,"BLOQUE_DELIMITADO":11,"SENT":12,"llaveA":13,"SENTS":14,"llaveC":15,"ASIGNACION":16,"IF":17,"WHILE":18,"TIPO":19,"ID":20,"parenA":21,"PARAMS":22,"parenC":23,"void":24,"coma":25,"PARAM":26,"mientras":27,"E":28,"si":29,"sino":30,"DECL_SUBJECT":31,"ASIGNACION_ID":32,"entero":33,"float":34,"booleano":35,"asigna":36,"id":37,"mas":38,"menos":39,"por":40,"div":41,"pow":42,"boolLit":43,"intLit":44,"floatLit":45,"stringLit":46,"$accept":0,"$end":1},
terminals_: {2:"error",5:"eof",8:"ptoComa",13:"llaveA",15:"llaveC",21:"parenA",23:"parenC",24:"void",25:"coma",27:"mientras",29:"si",30:"sino",33:"entero",34:"float",35:"booleano",36:"asigna",37:"id",38:"mas",39:"menos",40:"por",41:"div",42:"pow",43:"boolLit",44:"intLit",45:"floatLit",46:"stringLit"},
productions_: [0,[3,2],[4,2],[4,1],[6,2],[6,1],[10,1],[10,1],[11,3],[11,2],[14,2],[14,1],[12,2],[12,2],[12,1],[12,1],[9,6],[9,5],[9,6],[9,5],[22,3],[22,1],[26,2],[18,5],[17,5],[17,7],[7,3],[7,2],[31,1],[31,1],[19,1],[19,1],[19,1],[32,3],[16,1],[20,1],[28,3],[28,3],[28,3],[28,3],[28,3],[28,2],[28,3],[28,1],[28,1],[28,1],[28,1],[28,1]],
performAction: function anonymous(yytext, yyleng, yylineno, yy, yystate /* action[1] */, $$ /* vstack */, _$ /* lstack */) {
/* this == yyval */

var $0 = $$.length - 1;
switch (yystate) {
case 1:
 return $$[$0-1] 
break;
case 2:
 
            var arr = $$[$0-1].children; 
            var arr2 = arr.concat($$[$0]); 
            $$[$0-1].children = arr2; 
            this.$ = $$[$0-1];  

            if ($$[$0].type == 'dcl')
                size = $$[$0].size;
            else
                size = 0;
            this.$.size += size;
        
break;
case 3:
  
        if ($$[$0].type == 'dcl')
            size = $$[$0].size;
        else
            size = 0;
        this.$ = { type: 'stmnts', size: size, children: [$$[$0]] } 
    
break;
case 4: case 13:
 this.$ = $$[$0-1]
break;
case 5: case 14: case 15:
 this.$ = $$[$0] 
break;
case 6: case 34:

        this.$ = $$[$0];        
    
break;
case 7:
  
        this.$ = { type: 'sents', size: $$[$0].size, children: [$$[$0]] } 
    
break;
case 8:

        this.$ = $$[$0-1];        
    
break;
case 9:
  
        this.$ = { type: 'sents', size: 0 } 
    
break;
case 10:
 
            var arr = $$[$0-1].children; 
            var arr2 = arr.concat($$[$0]); 
            $$[$0-1].children = arr2; 
            this.$ = $$[$0-1];  
            this.$.size += $$[$0].size;
        
break;
case 11:
  this.$ = { type: 'sents', size: $$[$0].size, children: [$$[$0]] } 
break;
case 12:
 this.$ = $$[$0-1] 
break;
case 16:
  
        this.$ = { type: 'metodo', return_type: $$[$0-5], id: $$[$0-4], size: $$[$0-2].size, params: $$[$0-2], body:$$[$0] } 
    
break;
case 17:
  
        this.$ = { type: 'metodo', return_type: $$[$0-4], id: $$[$0-3], size: $$[$0].size, body:$$[$0] }        
    
break;
case 18:
  
        this.$ = { type: 'metodo', id: $$[$0-4], size: $$[$0-2].size, params: $$[$0-2], body:$$[$0] } 
    
break;
case 19:
          
        this.$ = { type: 'metodo', id: $$[$0-3], size: $$[$0].size, body:$$[$0] }        
    
break;
case 20: case 26:
 
        var arr = $$[$0-2].children; 
        var arr2 = arr.concat($$[$0]); 
        $$[$0-2].children = arr2; 
        this.$ = $$[$0-2];  
        this.$.size = $$[$0-2].size + 1;
    
break;
case 21:

        this.$ = { type: 'params', size: 1, children: [$$[$0]] }
    
break;
case 22:
  this.$ = { type: 'param', data_type: $$[$0-1], id: $$[$0] } 
break;
case 23:

        this.$ = { type:'while', size: 0, cond: $$[$0-2], body: $$[$0] }
    
break;
case 24:

        this.$ = { type:'if', size: 0, cond: $$[$0-2], body: $$[$0] }
    
break;
case 25:

        this.$ = { type:'if', size: 0, cond: $$[$0-4], body: $$[$0-2], body_else: $$[$0] }
    
break;
case 27:

        this.$ = { type: 'dcl', data_type: $$[$0-1], size: 1, children: [$$[$0]] }
    
break;
case 28: case 29:

        this.$ = $$[$0];
    
break;
case 30:

        this.$ = { type: 'tipo', val: 'int' }
    
break;
case 31:

        this.$ = { type: 'tipo', val: 'float' }
    
break;
case 32:

        this.$ = { type: 'tipo', val: 'bool' }
    
break;
case 33:

        this.$ = { type: '=', size: 0, children: [$$[$0-2], $$[$0]] }
    
break;
case 35:
  this.$ = { type: 'id', val: $$[$0] } 
break;
case 36:
                       
            this.$ = {type: '+', children: [$$[$0-2], $$[$0]] } 
        
break;
case 37:
                       
            this.$ = {type: '-', children: [$$[$0-2], $$[$0]] } 
        
break;
case 38:
                       
            this.$ = {type: '*', children: [$$[$0-2], $$[$0]] } 
        
break;
case 39:
                       
            this.$ = {type: '/', children: [$$[$0-2], $$[$0]] } 
        
break;
case 40:
                       
            this.$ = {type: '^', children: [$$[$0-2], $$[$0]] } 
        
break;
case 41:
                       
            this.$ = {type: '-', children: [$$[$0]] } 
        
break;
case 42:
 this.$ = $$[$0-1]; 
break;
case 43:
 
            valor = yytext.toLowerCase() == 'true'; 
            this.$ = {type: 'boolLit', val: valor } 
        
break;
case 44:
 
            valor = parseInt(yytext);
            this.$ = {type: 'intLit', val: valor } 
        
break;
case 45:
 
            valor = parseFloat(yytext);
            this.$ = {type: 'floatLit', val: valor} 
        
break;
case 46:
 
            valor = yytext;
            this.$ = {type: 'stringLit', val: valor } 
        
break;
case 47:
             
            this.$ = $$[$0]; 
        
break;
}
},
table: [{3:1,4:2,6:3,7:4,9:5,19:6,24:$V0,33:$V1,34:$V2,35:$V3},{1:[3]},{5:[1,11],6:12,7:4,9:5,19:6,24:$V0,33:$V1,34:$V2,35:$V3},o($V4,[2,3]),{8:[1,13],25:$V5},o($V4,[2,5]),{20:16,31:15,32:17,37:$V6},{20:19,37:$V6},{37:[2,30]},{37:[2,31]},{37:[2,32]},{1:[2,1]},o($V4,[2,2]),o($V4,[2,4]),{20:21,31:20,32:17,37:$V6},o($V7,[2,27]),o($V7,$V8,{21:[1,22],36:$V9}),o($V7,[2,29]),o([8,21,23,25,36,38,39,40,41,42],[2,35]),{21:[1,24]},o($V7,[2,26]),o($V7,$V8,{36:$V9}),{19:28,22:25,23:[1,26],26:27,33:$V1,34:$V2,35:$V3},{20:36,21:$Va,28:29,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{19:28,22:37,23:[1,38],26:27,33:$V1,34:$V2,35:$V3},{23:[1,39],25:$Vg},{11:41,13:$Vh},o($Vi,[2,21]),{20:43,37:$V6},o($V7,[2,33],{38:$Vj,39:$Vk,40:$Vl,41:$Vm,42:$Vn}),{20:36,21:$Va,28:49,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{20:36,21:$Va,28:50,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},o($Vo,[2,43]),o($Vo,[2,44]),o($Vo,[2,45]),o($Vo,[2,46]),o($Vo,[2,47]),{23:[1,51],25:$Vg},{11:52,13:$Vh},{11:53,13:$Vh},{19:28,26:54,33:$V1,34:$V2,35:$V3},o($V4,[2,17]),{7:58,12:57,14:55,15:[1,56],16:59,17:60,18:61,19:62,20:66,27:$Vp,29:$Vq,32:63,33:$V1,34:$V2,35:$V3,37:$V6},o($Vi,[2,22]),{20:36,21:$Va,28:67,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{20:36,21:$Va,28:68,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{20:36,21:$Va,28:69,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{20:36,21:$Va,28:70,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{20:36,21:$Va,28:71,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},o($Vo,[2,41]),{23:[1,72],38:$Vj,39:$Vk,40:$Vl,41:$Vm,42:$Vn},{11:73,13:$Vh},o($V4,[2,19]),o($V4,[2,16]),o($Vi,[2,20]),{7:58,12:75,15:[1,74],16:59,17:60,18:61,19:62,20:66,27:$Vp,29:$Vq,32:63,33:$V1,34:$V2,35:$V3,37:$V6},o($Vr,[2,9]),o($Vs,[2,11]),{8:[1,76],25:$V5},{8:[1,77]},o($Vt,[2,14]),o($Vt,[2,15]),{20:21,31:15,32:17,37:$V6},{8:[2,34]},{21:[1,78]},{21:[1,79]},{36:$V9},o($Vu,[2,36],{40:$Vl,41:$Vm,42:$Vn}),o($Vu,[2,37],{40:$Vl,41:$Vm,42:$Vn}),o($Vv,[2,38],{42:$Vn}),o($Vv,[2,39],{42:$Vn}),o($Vo,[2,40]),o($Vo,[2,42]),o($V4,[2,18]),o($Vr,[2,8]),o($Vs,[2,10]),o($Vt,[2,12]),o($Vt,[2,13]),{20:36,21:$Va,28:80,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{20:36,21:$Va,28:81,37:$V6,39:$Vb,43:$Vc,44:$Vd,45:$Ve,46:$Vf},{23:[1,82],38:$Vj,39:$Vk,40:$Vl,41:$Vm,42:$Vn},{23:[1,83],38:$Vj,39:$Vk,40:$Vl,41:$Vm,42:$Vn},{7:58,10:84,11:85,12:86,13:$Vh,16:59,17:60,18:61,19:62,20:66,27:$Vp,29:$Vq,32:63,33:$V1,34:$V2,35:$V3,37:$V6},{7:58,10:87,11:85,12:86,13:$Vh,16:59,17:60,18:61,19:62,20:66,27:$Vp,29:$Vq,32:63,33:$V1,34:$V2,35:$V3,37:$V6},o($Vs,[2,24],{30:[1,88]}),o($Vt,[2,6]),o($Vt,[2,7]),o($Vt,[2,23]),{7:58,10:89,11:85,12:86,13:$Vh,16:59,17:60,18:61,19:62,20:66,27:$Vp,29:$Vq,32:63,33:$V1,34:$V2,35:$V3,37:$V6},o($Vt,[2,25])],
defaultActions: {8:[2,30],9:[2,31],10:[2,32],11:[2,1],63:[2,34]},
parseError: function parseError(str, hash) {
    if (hash.recoverable) {
        this.trace(str);
    } else {
        var error = new Error(str);
        error.hash = hash;
        throw error;
    }
},
parse: function parse(input) {
    var self = this, stack = [0], tstack = [], vstack = [null], lstack = [], table = this.table, yytext = '', yylineno = 0, yyleng = 0, recovering = 0, TERROR = 2, EOF = 1;
    var args = lstack.slice.call(arguments, 1);
    var lexer = Object.create(this.lexer);
    var sharedState = { yy: {} };
    for (var k in this.yy) {
        if (Object.prototype.hasOwnProperty.call(this.yy, k)) {
            sharedState.yy[k] = this.yy[k];
        }
    }
    lexer.setInput(input, sharedState.yy);
    sharedState.yy.lexer = lexer;
    sharedState.yy.parser = this;
    if (typeof lexer.yylloc == 'undefined') {
        lexer.yylloc = {};
    }
    var yyloc = lexer.yylloc;
    lstack.push(yyloc);
    var ranges = lexer.options && lexer.options.ranges;
    if (typeof sharedState.yy.parseError === 'function') {
        this.parseError = sharedState.yy.parseError;
    } else {
        this.parseError = Object.getPrototypeOf(this).parseError;
    }
    function popStack(n) {
        stack.length = stack.length - 2 * n;
        vstack.length = vstack.length - n;
        lstack.length = lstack.length - n;
    }
    _token_stack:
        var lex = function () {
            var token;
            token = lexer.lex() || EOF;
            if (typeof token !== 'number') {
                token = self.symbols_[token] || token;
            }
            return token;
        };
    var symbol, preErrorSymbol, state, action, a, r, yyval = {}, p, len, newState, expected;
    while (true) {
        state = stack[stack.length - 1];
        if (this.defaultActions[state]) {
            action = this.defaultActions[state];
        } else {
            if (symbol === null || typeof symbol == 'undefined') {
                symbol = lex();
            }
            action = table[state] && table[state][symbol];
        }
                    if (typeof action === 'undefined' || !action.length || !action[0]) {
                var errStr = '';
                expected = [];
                for (p in table[state]) {
                    if (this.terminals_[p] && p > TERROR) {
                        expected.push('\'' + this.terminals_[p] + '\'');
                    }
                }
                if (lexer.showPosition) {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ':\n' + lexer.showPosition() + '\nExpecting ' + expected.join(', ') + ', got \'' + (this.terminals_[symbol] || symbol) + '\'';
                } else {
                    errStr = 'Parse error on line ' + (yylineno + 1) + ': Unexpected ' + (symbol == EOF ? 'end of input' : '\'' + (this.terminals_[symbol] || symbol) + '\'');
                }
                this.parseError(errStr, {
                    text: lexer.match,
                    token: this.terminals_[symbol] || symbol,
                    line: lexer.yylineno,
                    loc: yyloc,
                    expected: expected
                });
            }
        if (action[0] instanceof Array && action.length > 1) {
            throw new Error('Parse Error: multiple actions possible at state: ' + state + ', token: ' + symbol);
        }
        switch (action[0]) {
        case 1:
            stack.push(symbol);
            vstack.push(lexer.yytext);
            lstack.push(lexer.yylloc);
            stack.push(action[1]);
            symbol = null;
            if (!preErrorSymbol) {
                yyleng = lexer.yyleng;
                yytext = lexer.yytext;
                yylineno = lexer.yylineno;
                yyloc = lexer.yylloc;
                if (recovering > 0) {
                    recovering--;
                }
            } else {
                symbol = preErrorSymbol;
                preErrorSymbol = null;
            }
            break;
        case 2:
            len = this.productions_[action[1]][1];
            yyval.$ = vstack[vstack.length - len];
            yyval._$ = {
                first_line: lstack[lstack.length - (len || 1)].first_line,
                last_line: lstack[lstack.length - 1].last_line,
                first_column: lstack[lstack.length - (len || 1)].first_column,
                last_column: lstack[lstack.length - 1].last_column
            };
            if (ranges) {
                yyval._$.range = [
                    lstack[lstack.length - (len || 1)].range[0],
                    lstack[lstack.length - 1].range[1]
                ];
            }
            r = this.performAction.apply(yyval, [
                yytext,
                yyleng,
                yylineno,
                sharedState.yy,
                action[1],
                vstack,
                lstack
            ].concat(args));
            if (typeof r !== 'undefined') {
                return r;
            }
            if (len) {
                stack = stack.slice(0, -1 * len * 2);
                vstack = vstack.slice(0, -1 * len);
                lstack = lstack.slice(0, -1 * len);
            }
            stack.push(this.productions_[action[1]][0]);
            vstack.push(yyval.$);
            lstack.push(yyval._$);
            newState = table[stack[stack.length - 2]][stack[stack.length - 1]];
            stack.push(newState);
            break;
        case 3:
            return true;
        }
    }
    return true;
}};

    var nid = 0;
    var valor, size;

    function addChildren(node, child){
      node.splice(2,1,child); 
      return node;
    }    
/* generated by jison-lex 0.3.4 */
var lexer = (function(){
var lexer = ({

EOF:1,

parseError:function parseError(str, hash) {
        if (this.yy.parser) {
            this.yy.parser.parseError(str, hash);
        } else {
            throw new Error(str);
        }
    },

// resets the lexer, sets new input
setInput:function (input, yy) {
        this.yy = yy || this.yy || {};
        this._input = input;
        this._more = this._backtrack = this.done = false;
        this.yylineno = this.yyleng = 0;
        this.yytext = this.matched = this.match = '';
        this.conditionStack = ['INITIAL'];
        this.yylloc = {
            first_line: 1,
            first_column: 0,
            last_line: 1,
            last_column: 0
        };
        if (this.options.ranges) {
            this.yylloc.range = [0,0];
        }
        this.offset = 0;
        return this;
    },

// consumes and returns one char from the input
input:function () {
        var ch = this._input[0];
        this.yytext += ch;
        this.yyleng++;
        this.offset++;
        this.match += ch;
        this.matched += ch;
        var lines = ch.match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno++;
            this.yylloc.last_line++;
        } else {
            this.yylloc.last_column++;
        }
        if (this.options.ranges) {
            this.yylloc.range[1]++;
        }

        this._input = this._input.slice(1);
        return ch;
    },

// unshifts one char (or a string) into the input
unput:function (ch) {
        var len = ch.length;
        var lines = ch.split(/(?:\r\n?|\n)/g);

        this._input = ch + this._input;
        this.yytext = this.yytext.substr(0, this.yytext.length - len);
        //this.yyleng -= len;
        this.offset -= len;
        var oldLines = this.match.split(/(?:\r\n?|\n)/g);
        this.match = this.match.substr(0, this.match.length - 1);
        this.matched = this.matched.substr(0, this.matched.length - 1);

        if (lines.length - 1) {
            this.yylineno -= lines.length - 1;
        }
        var r = this.yylloc.range;

        this.yylloc = {
            first_line: this.yylloc.first_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.first_column,
            last_column: lines ?
                (lines.length === oldLines.length ? this.yylloc.first_column : 0)
                 + oldLines[oldLines.length - lines.length].length - lines[0].length :
              this.yylloc.first_column - len
        };

        if (this.options.ranges) {
            this.yylloc.range = [r[0], r[0] + this.yyleng - len];
        }
        this.yyleng = this.yytext.length;
        return this;
    },

// When called from action, caches matched text and appends it on next action
more:function () {
        this._more = true;
        return this;
    },

// When called from action, signals the lexer that this rule fails to match the input, so the next matching rule (regex) should be tested instead.
reject:function () {
        if (this.options.backtrack_lexer) {
            this._backtrack = true;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });

        }
        return this;
    },

// retain first n characters of the match
less:function (n) {
        this.unput(this.match.slice(n));
    },

// displays already matched input, i.e. for error messages
pastInput:function () {
        var past = this.matched.substr(0, this.matched.length - this.match.length);
        return (past.length > 20 ? '...':'') + past.substr(-20).replace(/\n/g, "");
    },

// displays upcoming input, i.e. for error messages
upcomingInput:function () {
        var next = this.match;
        if (next.length < 20) {
            next += this._input.substr(0, 20-next.length);
        }
        return (next.substr(0,20) + (next.length > 20 ? '...' : '')).replace(/\n/g, "");
    },

// displays the character position where the lexing error occurred, i.e. for error messages
showPosition:function () {
        var pre = this.pastInput();
        var c = new Array(pre.length + 1).join("-");
        return pre + this.upcomingInput() + "\n" + c + "^";
    },

// test the lexed token: return FALSE when not a match, otherwise return token
test_match:function (match, indexed_rule) {
        var token,
            lines,
            backup;

        if (this.options.backtrack_lexer) {
            // save context
            backup = {
                yylineno: this.yylineno,
                yylloc: {
                    first_line: this.yylloc.first_line,
                    last_line: this.last_line,
                    first_column: this.yylloc.first_column,
                    last_column: this.yylloc.last_column
                },
                yytext: this.yytext,
                match: this.match,
                matches: this.matches,
                matched: this.matched,
                yyleng: this.yyleng,
                offset: this.offset,
                _more: this._more,
                _input: this._input,
                yy: this.yy,
                conditionStack: this.conditionStack.slice(0),
                done: this.done
            };
            if (this.options.ranges) {
                backup.yylloc.range = this.yylloc.range.slice(0);
            }
        }

        lines = match[0].match(/(?:\r\n?|\n).*/g);
        if (lines) {
            this.yylineno += lines.length;
        }
        this.yylloc = {
            first_line: this.yylloc.last_line,
            last_line: this.yylineno + 1,
            first_column: this.yylloc.last_column,
            last_column: lines ?
                         lines[lines.length - 1].length - lines[lines.length - 1].match(/\r?\n?/)[0].length :
                         this.yylloc.last_column + match[0].length
        };
        this.yytext += match[0];
        this.match += match[0];
        this.matches = match;
        this.yyleng = this.yytext.length;
        if (this.options.ranges) {
            this.yylloc.range = [this.offset, this.offset += this.yyleng];
        }
        this._more = false;
        this._backtrack = false;
        this._input = this._input.slice(match[0].length);
        this.matched += match[0];
        token = this.performAction.call(this, this.yy, this, indexed_rule, this.conditionStack[this.conditionStack.length - 1]);
        if (this.done && this._input) {
            this.done = false;
        }
        if (token) {
            return token;
        } else if (this._backtrack) {
            // recover context
            for (var k in backup) {
                this[k] = backup[k];
            }
            return false; // rule action called reject() implying the next rule should be tested instead.
        }
        return false;
    },

// return next match in input
next:function () {
        if (this.done) {
            return this.EOF;
        }
        if (!this._input) {
            this.done = true;
        }

        var token,
            match,
            tempMatch,
            index;
        if (!this._more) {
            this.yytext = '';
            this.match = '';
        }
        var rules = this._currentRules();
        for (var i = 0; i < rules.length; i++) {
            tempMatch = this._input.match(this.rules[rules[i]]);
            if (tempMatch && (!match || tempMatch[0].length > match[0].length)) {
                match = tempMatch;
                index = i;
                if (this.options.backtrack_lexer) {
                    token = this.test_match(tempMatch, rules[i]);
                    if (token !== false) {
                        return token;
                    } else if (this._backtrack) {
                        match = false;
                        continue; // rule action called reject() implying a rule MISmatch.
                    } else {
                        // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
                        return false;
                    }
                } else if (!this.options.flex) {
                    break;
                }
            }
        }
        if (match) {
            token = this.test_match(match, rules[index]);
            if (token !== false) {
                return token;
            }
            // else: this is a lexer rule which consumes input without producing a token (e.g. whitespace)
            return false;
        }
        if (this._input === "") {
            return this.EOF;
        } else {
            return this.parseError('Lexical error on line ' + (this.yylineno + 1) + '. Unrecognized text.\n' + this.showPosition(), {
                text: "",
                token: null,
                line: this.yylineno
            });
        }
    },

// return next match that has a token
lex:function lex() {
        var r = this.next();
        if (r) {
            return r;
        } else {
            return this.lex();
        }
    },

// activates a new lexer condition state (pushes the new lexer condition state onto the condition stack)
begin:function begin(condition) {
        this.conditionStack.push(condition);
    },

// pop the previously active lexer condition state off the condition stack
popState:function popState() {
        var n = this.conditionStack.length - 1;
        if (n > 0) {
            return this.conditionStack.pop();
        } else {
            return this.conditionStack[0];
        }
    },

// produce the lexer rule set which is active for the currently active lexer condition state
_currentRules:function _currentRules() {
        if (this.conditionStack.length && this.conditionStack[this.conditionStack.length - 1]) {
            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
        } else {
            return this.conditions["INITIAL"].rules;
        }
    },

// return the currently active lexer condition state; when an index argument is provided it produces the N-th previous condition state, if available
topState:function topState(n) {
        n = this.conditionStack.length - 1 - Math.abs(n || 0);
        if (n >= 0) {
            return this.conditionStack[n];
        } else {
            return "INITIAL";
        }
    },

// alias for begin(condition)
pushState:function pushState(condition) {
        this.begin(condition);
    },

// return the number of states currently on the stack
stateStackSize:function stateStackSize() {
        return this.conditionStack.length;
    },
options: {"case-insensitive":true},
performAction: function anonymous(yy,yy_,$avoiding_name_collisions,YY_START) {
var YYSTATE=YY_START;
switch($avoiding_name_collisions) {
case 0: this.pushState('ML_COMMENT'); 
break;
case 1: this.popState(); 
break;
case 2: throw "Final inesperado de archivo (comentario no cerrado)"; 
break;
case 3:/* Se ignora todo */
break;
case 4: this.pushState('STRING'); limpiarString(); 
break;
case 5: 
						this.popState(); 
						yy_.yytext=getString(); 
						return 46; 
					
break;
case 6: appendString(yy_.yytext); 
break;
case 7: appendString(yy_.yytext); yy_.yytext=getString(); return 'errorLex'; 
break;
case 8:/* ignorar comentario de línea */
break;
case 9:/* skip whitespace */
break;
case 10:return 45
break;
case 11:return 44
break;
case 12:return 43
break;
case 13:return 43
break;
case 14:return 35
break;
case 15:return 33
break;
case 16:return 34
break;
case 17:return 24
break;
case 18:return '_for'
break;
case 19:return 27
break;
case 20:return 29
break;
case 21:return 30
break;
case 22:return '_break'
break;
case 23:return '_continue'
break;
case 24:return '_return'
break;
case 25:return 37
break;
case 26:return 'accesor'
break;
case 27:return 13
break;
case 28:return 15
break;
case 29:return 21
break;
case 30:return 23
break;
case 31:return 'bracketA'
break;
case 32:return 'bracketC'
break;
case 33:return 25
break;
case 34:return 8
break;
case 35:return 'pto'
break;
case 36:return 38
break;
case 37:return 39
break;
case 38:return 40
break;
case 39:return 41
break;
case 40:return 42
break;
case 41:return 'mod'
break;
case 42:return 'mayorI'
break;
case 43:return 'menorI'
break;
case 44:return 'igual'
break;
case 45:return 'noIgual'
break;
case 46:return 'mayor'
break;
case 47:return 'menor'
break;
case 48:return 'and'
break;
case 49:return 'or'
break;
case 50:return 'not'
break;
case 51:return 36
break;
case 52:return 'errorLex'
break;
case 53:return 5
break;
}
},
rules: [/^(?:\/\*)/i,/^(?:\*\/)/i,/^(?:$)/i,/^(?:.)/i,/^(?:")/i,/^(?:")/i,/^(?:.)/i,/^(?:$)/i,/^(?:\/\/[^\n\r]*)/i,/^(?:\s+)/i,/^(?:[0-9]+(\.[0-9]+)\b)/i,/^(?:[0-9]+)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:bool\b)/i,/^(?:int\b)/i,/^(?:float\b)/i,/^(?:void\b)/i,/^(?:for\b)/i,/^(?:while\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:[a-zA-Z_][a-zA-Z0-9_]*)/i,/^(?:->)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\()/i,/^(?:\))/i,/^(?:\[)/i,/^(?:\])/i,/^(?:,)/i,/^(?:;)/i,/^(?:\.)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:>=)/i,/^(?:<=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:>)/i,/^(?:<)/i,/^(?:&&)/i,/^(?:\|\|)/i,/^(?:!)/i,/^(?:=)/i,/^(?:.)/i,/^(?:$)/i],
conditions: {"STRING":{"rules":[5,6,7],"inclusive":false},"ML_COMMENT":{"rules":[1,2,3],"inclusive":false},"INITIAL":{"rules":[0,4,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53],"inclusive":true}}
});
var string = "";
function limpiarString(){
  string="";
}
function appendString(char){
  string = string + char;
}
function getString(){
  return string;
};
return lexer;
})();
parser.lexer = lexer;
function Parser () {
  this.yy = {};
}
Parser.prototype = parser;parser.Parser = Parser;
return new Parser;
})();


if (typeof require !== 'undefined' && typeof exports !== 'undefined') {
exports.parser = parser;
exports.Parser = parser.Parser;
exports.parse = function () { return parser.parse.apply(parser, arguments); };
exports.main = function commonjsMain(args) {
    if (!args[1]) {
        console.log('Usage: '+args[0]+' FILE');
        process.exit(1);
    }
    var source = require('fs').readFileSync(require('path').normalize(args[1]), "utf8");
    return exports.parser.parse(source);
};
if (typeof module !== 'undefined' && require.main === module) {
  exports.main(process.argv.slice(1));
}
}