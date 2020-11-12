var http = require ("http");
var axios = require('axios')

http.createServer(function(req, res){
  
    console.log(req.method + " " + req.url)
    // permite verificar se o url esta no formato aceite. EXPRESSAO REGULAR ENTRE / exp/. O $ garante que o que esta antes aparece no fim da linha
    if (req.method=='GET'){
        // Esta a espera dá página principal
        if (req.url=='/'){
            res.writeHead (200,{'Content-Type': "text/html; charset=utf-8"});
            res.write("<h2> Escola de música </h2>" )  // titulo
            res.write ("<ul>")
            res.write ('<li> <a href="/alunos"> Lista de Alunos</a></li>')
            res.write ('<li> <a href="/cursos">  Lista de Cursos </a> </li>')
            res.write ('<li><a href="/instrumentos">  Lista de Instrumentos </a> </li>')
            res.write ("</ul>")
            res.end ()
        }
        else if (req.url=="/alunos"){
    
                axios.get('http://localhost:3000/alunos')
                        .then (function(resp) 
                            {
                                alunos = resp.data

                                res.writeHead (200,{'Content-Type': "text/html; charset=utf-8"});
                                res.write("<h2> Escola de música: Lista de alunos </h2>" )  // titulo
                                
                                res.write ("<ul>")
                               
                                // conteudo da lista é preenchido com os dados que chegam do servidor

                                alunos.forEach(a => {
                                    res.write(`<li> <a href="/alunos/${a.id}"> ${a.id} - ${a.nome} </a></li>`)
                                   //res.write('<li> ' +  a.id + '-' + a.nome + '</li>')
                                });

                                res.write ("</ul>")
                                res.write('<address>[<a href="/"> Voltar ao inicio</a>]</address>')
                                res.end ()

                            })
                            .catch(function (error){
                                console.log("Erro na obtenção da lista de alunos: " + error)
                            })
           }

            // LISTA INDIVIDUAL DE ALUNOS
            else if ( req.url.match(/\/alunos\/A[E\-0123456789]+/)) {
                var num = req.url.split("/")[req.url.split('/').length-1]  // Para suportar abrir mais do que um ficheiro
                console.log(num)
                axios.get(`http://localhost:3000/alunos/${num}`)
                .then (function(resp) 
                    {
                        aluno = resp.data
                        console.log(num)
                        res.writeHead (200,{'Content-Type': "text/html; charset=utf-8"});
                        res.write(`<h2> Descrição do Aluno  ${aluno.id} </h2>` )  // titulo
                        
                        res.write ("<ul>")
                        
                        res.write(`<li><b> ID:</b> ${aluno.id} </li>`)
                        res.write(`<li> <b>Nome:</b> ${aluno.nome} </li>`)
                        res.write(`<li><b> Data Nascimento:</b> ${aluno.dataNasc} </li>`)
                        res.write(`<li> <b>Curso</b> ${aluno.curso} </li>`)
                        res.write(`<li><b>Ano Curso</b> ${aluno.anoCurso} </li>`)
                        res.write(`<li><b>Instrumento<b/> ${aluno.instrumento} </li>`)
                         
                        res.write ("</ul>")
                        res.write('<address>[<a href="/alunos"> Voltar a lista alunos</a>]</address>')
                        res.end ()

                    })
                    .catch(function (error){
                        console.log("Erro na obtenção do aluno: " + error)
                    })

           }

           // LISTA GERAL DOS CURSOS
           else if (req.url=="/cursos"){
    
            axios.get('http://localhost:3000/cursos')
                    .then (function(resp) 
                        {
                            cursos = resp.data

                            res.writeHead (200,{'Content-Type': "text/html; charset=utf-8"});
                            res.write("<h2> Escola de música: Lista de Cursos </h2>" )  // titulo
                            
                            res.write ("<ul>")
                           
                            // conteudo da lista é preenchido com os dados que chegam do servidor

                            cursos.forEach(c => {
                                res.write(`<li> <a href="/cursos/${c.id}"> ${c.id} - ${c.designacao} </a></li>`)
                            });

                            res.write ("</ul>")
                            res.write('<address>[<a href="/"> Voltar ao inicio</a>]</address>')
                            res.end ()

                        })
                        .catch(function (error){
                            console.log("Erro na obtenção da lista de cursos: " + error)
                        })
           }
              // LISTA INDIVIDUAL DE cursos
              else if ( req.url.match(/\/cursos\/C[A-Z0-9]+/)) {
                var num = req.url.split("/")[req.url.split('/').length-1]  // Para suportar abrir mais do que um ficheiro
                console.log(num)
                axios.get(`http://localhost:3000/cursos/${num}`)
                .then (function(resp) 
                    {
                        curso = resp.data
                        
                        res.writeHead (200,{'Content-Type': "text/html; charset=utf-8"});
                        res.write(`<h2> Descrição do Cursos  ${curso.id} </h2>` )  // titulo
                        
                        res.write ("<ul>")
                        
                        res.write(`<li><b> ID:</b> ${curso.id} </li>`)
                        res.write(`<li> <b>Designação:</b> ${curso.designacao} </li>`)
                        res.write(`<li> <b>Duração:</b> ${curso.duracao} </li>`)
                        res.write(`<li> <b>Instrumento ID:</b> ${curso.instrumento.id} </li>`)
                        res.write(`<li> <b>Nome do Instrumento:</b> ${curso.instrumento['#text']} </li>`)
                          
                        res.write ("</ul>")
                        res.write('<address>[<a href="/cursos"> Voltar a lista de cursos</a>]</address>')
                        res.end ()

                    })
                    .catch(function (error){
                        console.log("Erro na obtenção do curso: " + error)
                    })

                }

            // LISTA GERAL DOS INSTRUMENTOS
           else if (req.url=="/instrumentos"){
    
            axios.get('http://localhost:3000/instrumentos')
                    .then (function(resp) 
                        {
                            intrumentos = resp.data

                            res.writeHead (200,{'Content-Type': "text/html; charset=utf-8"});
                            res.write("<h2> Escola de música: Lista de Instrumentos </h2>" )  // titulo
                            
                            res.write ("<ul>")
                           
                            // conteudo da lista é preenchido com os dados que chegam do servidor

                            instrumentos.forEach(i => {
                                res.write(`<li> <a href="/instrumentos/${i.id}"> ${i.id} </a></li>`)
                            });

                            res.write ("</ul>")
                            res.write('<address>[<a href="/"> Voltar ao inicio</a>]</address>')
                            res.end ()

                        })
                        .catch(function (error){
                            console.log("Erro na obtenção da lista de instrumentos: " + error)
                        })
           }
              


        else{
            res.writeHead (200,{'Content-Type': "text/html"});
            res.write("<p>Pedido não suportado." + req.method + "</p>" )
            res.end ()
        }

    }
  
    else{
        res.writeHead (200,{'Content-Type': "text/html"});
        res.write("<p>Pedido não suportado." + req.method + "</p>" )
        res.end ()
    }
}).listen(4000);

console.log('Servidor a correr na porta 4000...')