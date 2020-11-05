var http = require ("http");
var fs = require('fs')
var aux=require ("./mymod.js");
const { url } = require("inspector");

http.createServer(function(req, res){
    console.log(req.method + " " + req.url + " " + aux.myDateTime())  

    var num = req.url.split('/')[req.url.split('/').length-1] // Para ler o número do ficheiro a abrir
    console.log ("Numero do ficheiro a abrir: " + num)
    
    // permite verificar se o url esta no formato aceite: /arq/numero_do_ficheiro
    if (req.url.match(/\/arq\/[1-9][0-9]?[0-9]?$/ )){

        fs.readFile("site/arq" + num + ".html", function(err, data){

            if(err){
                res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                res.write('Ficheiro inexistente: arq' + num + ".html" )
                res.end()
            }
            else{
        
            res.writeHead (200,{'Content-Type': " text/html"});
            res.write(data)
            res.end ()
            }

        })
    }
    else{
            // Para o index
        if (req.url.match(/\/$/ )){
            fs.readFile("site/index.html", function(err, data){
                if(err){
                    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'})
                    res.write('Ficheiro inexistente ')
                    res.end()
                }
                else{
                res.writeHead (200,{'Content-Type': " text/html"});
                res.write(data)
                res.end ()
                }

            })
        }
            
        else{        
            res.writeHead (200,{'Content-Type': "text/html"});
            res.write("<p>O URL inserido nao esta correto</p>")
            res.end ()
        }
    }
    
}).listen(7777);

console.log('Servidor a correr na porta 7777...')