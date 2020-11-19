var http = require('http')
var axios = require('axios') // fazer pedidos a API de dados
var fs = require('fs')

var static = require('./static')

var { parse } = require('querystring')


// Retrieves student info from request body --------------------------------
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){  // Verfica se é texto 
        let body = '' 
        request.on('data', bloco => {
            body += bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}


function geraPagInicial(d){
    let pagHTML = `
      <html>
          <head>
              <title>Agenda</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>Agenda</h2>
              </div>
              <p>
                 Bem vindo a sua agenda pessoal.</p>
              <p>
                 Por favor selecione a ação que pretende realizar.
              </p>
              <ul>
                      <li><a href="/AdicionarTarefa"> Adicionar Tarefas</a></li>
                      <li><a href="/ConsultarTarefas">Consultar Tarefas</a></li>
                      <li><a href="/ConsultarRealizadas">Consultar as Tarefas Realizadas</a></li>
                      
              </ul>
         
          <div class="w3-container w3-teal">
              <address>Gerado por gtarefas::DAW2020 em ${d} --------------</address>
          </div>
      </body>
      </html>
    `
    return pagHTML
  }

  // Template para a página com a lista de tarefas ------------
function geraPagNovasTarefas ( tarefas, d){
    let pagHTML = `
      <html>
          <head>
              <title>Lista de Tarefas</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
              <div class="w3-container w3-teal">
                  <h2>Lista de tarefas</h2>
                  <h4>Aqui encontra-se a lista de tarefas que deve concluir antes o prazo final apresentado</h4>
              </div>
              <table class="w3-table w3-bordered">
                  <tr>
                      <th>Descrição </th>
                      <th>Tipo</th>
                      <th>Data Inicio</th>
                      <th>Data Final </th>
                      <th>Tarefa a realizar por: </th>
                  </tr>
    `
   
       tarefas.forEach (t =>
          pagHTML += `
          <tr>
            <td>${t.nome} </td> 
            <th>${t.Tipo}</th>
            <th>${t.dataI}</th>
            <th>${t.dataF}</th>
            <th>${t.quem_realiza}</th>
          </tr>
          `)
  
    pagHTML += `
          </table>
          <footer class="w3-container w3-teal">
                <address>Gerado por gtarefas::DAW2020 em ${d} - [<a href="/">Voltar ao inicio</a>]</address>
            </footer>
      </body>
      </html>
    `
    return pagHTML
  }


 // Template para a página com a lista de tarefas ------------
 function geraPagTarefasReal ( tarefas , d){
    let pagHTML = `
      <html>
          <head>
              <title>Lista de Tarefas</title>
              <meta charset="utf-8"/>
              <link rel="icon" href="favicon.png"/>
              <link rel="stylesheet" href="w3.css"/>
          </head>
          <body>
            <div class="w3-container w3-teal">
                <h2>Lista de tarefas Realizadas</h2>
             </div>
        <table class="w3-table w3-bordered">
            <tr>
                <th>Descrição </th>
                <th>Tipo</th>
                <th>Data de Inicio</th>
                <th>Data de Fim </th>
                <th>Tarefa realizada por: </th>
            </tr>
    `
   
       tarefas.forEach (t =>
          pagHTML += `
          <tr>
            <td>${t.nome} </td> 
            <th>${t.Tipo}</th>
            <th>${t.dataI}</th>
            <th>${t.dataF}</th>
            <th>${t.quem_realiza}</th>
          </tr>
          `)
  
    pagHTML += `
          </table>
          <footer class="w3-container w3-teal">
                <address>Gerado por gtarefas::DAW2020 em ${d} - [<a href="/">Voltar ao inicio</a>]</address>
            </footer>
      </body>
      </html>
    `
    return pagHTML
  }

  // Template para o formulário de aluno ------------------
function geraFormTarefa( d ){
    return `
    <html>
        <head>
            <title>Registo de uma nova Tarefa</title>
            <meta charset="utf-8"/>
            <link rel="icon" href="favicon.png"/>
            <link rel="stylesheet" href="w3.css"/>
        </head>
        <body>
        
        </body>
            <div class="w3-container w3-teal">
                <h2>Registo de uma nova Tarefa </h2>
            </div>

            <form class="w3-container" action="/tarefas" method="POST">

                <label class="w3-text-teal"><b>Identificador</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="id">
                
                
                <label class="w3-text-teal"><b>Descrição</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="nome">
          
                

                <label class="w3-text-teal"><b>Tipo</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="Tipo">

                <label class="w3-text-teal"><b>Data de Inicio</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dataI">

                <label class="w3-text-teal"><b>Prazo Limite </b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="dataF">
                
                <label class="w3-text-teal"><b>Quem realiza a tarefa?</b></label>
                <input class="w3-input w3-border w3-light-grey" type="text" name="quem_realiza">

                <label class="w3-text-teal"><b>A tarefa já foi realizada? [sim/nao]</b></label> 

                <input class="w3-input w3-border w3-light-grey" type="text" name="realizada">

                <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
            </form>

            <footer class="w3-container w3-teal">
                <address>Gerado por gtarefa::DAW2020 em ${d}</address>
            </footer>
        </body>
    </html>
    `
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( tarefa, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${tarefa.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Tarefa ${tarefa.id} inserida</h1>
            </header>

            <div class="w3-container">
                <p><a href="/ConsultarTarefas">Aceda aqui à lista de Tarefas."</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}




// -----------------------------------------------------------------------------------------------------------------------

// Criação do servidor

var galunoServer = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    // Tratamento do pedido
    // no caso de termos uma resurso estatico tipo o fiveicon e o w3
    if (static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req,res)
    }
    else{
        switch(req.method){
            case "GET": 
                // GET /tarefas 
                if((req.url == "/")){

                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            
                    res.write(geraPagInicial(d))
                            
                    res.end()

                }

                // Get das tarefas que faltam
                else if ((req.url == "/ConsultarTarefas")){
                    axios.get("http://localhost:3000/tarefas?realizada=nao")
                        .then(response => {
                            var tarefas = response.data

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            
                            res.write(geraPagNovasTarefas(tarefas,d))
                            
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível apresentar a lista de tarefas...")
                            res.end()
                        })
                }
                // Get das tarefas realizadas
                else if ((req.url == "/ConsultarRealizadas")){
                    axios.get("http://localhost:3000/tarefas?realizada=sim")
                        .then(response => {
                            var tarefas = response.data

                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            
                            res.write(geraPagTarefasReal(tarefas,d))
                            
                            res.end()
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível apresentar a lista de tarefas Realizadas...")
                            res.end()
                        })
                }
                
                /*
                 GET /alunos/:id --------------------------------------------------------------------
                else if(/\/alunos\/(A|PG)[0-9]+$/.test(req.url)){
                    var idAluno = req.url.split("/")[2]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                        .then( response => {
                            let a = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraPagAluno(a,d))
                            res.end()
                            
        
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter o aluno...")
                            res.end()
                        })
                }
                */
                // GET /alunos/registo --------------------------------------------------------------------
                else if(req.url == "/AdicionarTarefa"){
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write(geraFormTarefa(d))
                    res.end()
                }
                /*
                  // Vamos editar um registo. Para isso vamos busca-lo e dpeois altera-se.
                  // GET /alunos/id/edit --------------------------------------------------------------------
                  else if(/\/alunos\/(A|PG)[0-9]+\/edit/.test(req.url)){
                    
                    var idAluno = req.url.split("/")[2]
                    axios.get("http://localhost:3000/alunos/" + idAluno)
                        .then( response => {
                            let a = response.data
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write(geraForm2Aluno(a,d))
                            res.end()
                            
        
                        })
                        .catch(function(erro){
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Não foi possível obter o registo aluno...")
                            res.end()
                        })
                }
              */
                break
               
         
            case "POST":
                if (req.url == "/tarefas"){
                    recuperaInfo(req, resultado => {
                        console.log('POST de Tarefas:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/tarefas', resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraPostConfirm( resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no POST: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                    
                }
                break
/*
                else if (req.url == "/alunos/edit"){
                    recuperaInfo(req, resultado => {
                        console.log('PUT de aluno:' + JSON.stringify(resultado))
                        axios.post('http://localhost:3000/alunos/' + resultado.id, resultado)
                            .then(resp => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write(geraPostConfirm( resp.data, d))
                                res.end()
                            })
                            .catch(erro => {
                                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                                res.write('<p>Erro no Put: ' + erro + '</p>')
                                res.write('<p><a href="/">Voltar</a></p>')
                                res.end()
                            })
                    })
                }

                break
            */
        }
    }
})


galunoServer.listen(4000)
console.log('Servidor à escuta na porta 4000...')