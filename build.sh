#!/bin/bash 
cd app
rm -f parser.js 
cd ..
cd grammar
jison sintactico.jison lexico.jisonlex -o "../app/parser.js"