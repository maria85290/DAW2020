var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET /students
router.get('/students', function(req, res) {
  // Data retrieve
  Student.list()
    .then(data => res.render('students', { list: data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

// GET /students/register
router.get('/students/register', function(req, res) {
  res.render('register_student')
 
});

// GET /students/edit/:id
router.get('/students/edit/:id', function(req, res,next) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('edit_student', { aluno : data }))
    .catch(err => res.render('error', {error: err}))
  ;
});

// GET /students/delete/:id
router.get('/students/delete/:id', function(req, res,next) {
  // Data retrieve
  console.log(req.params.id)
  Student.delete(req.params.id)
    .then(() => res.render('index'))
    .catch(err => res.render('error', {error: err}))
  
});



// GET /students/:id
router.get('/students/:id', function(req, res,next) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('info_student', { aluno : data }))
    .catch(err => res.render('error', {error: err}))
  ;
});



// POST /students/register
router.post('/students', function(req, res) {
  
  var student = new Object();
  

  let num = req.body.numero;
  let nome = req.body.nome;
  let git = req.body.git;

  student.numero = num
  student.nome = nome
  student.git = git

  let tpc1 = req.body.tpc1;
  let tpc2 = req.body.tpc2;
  let tpc3 = req.body.tpc3;
  let tpc4 = req.body.tpc4;
  let tpc5 = req.body.tpc5;
  let tpc6 = req.body.tpc6;
  let tpc7 = req.body.tpc7;
  let tpc8 = req.body.tpc8;

  let tpcs = new Array(8).fill(0)  // criar array para colocar os tpcs
  let t1 = 0
  let t2 = 0
  let t3 = 0
  let t4 = 0
  let t5 = 0
  let t6 = 0
  let t7 = 0
  let t8 = 0


  if (tpc1 == 'on'){
     t1 = 1
  }
  if (tpc2 == 'on'){
    t2 = 1
   }
  if (tpc3 == 'on'){
    t3 = 1
  }
  if (tpc4 == 'on'){
    t4 = 1
  }
  if (tpc5 == 'on'){
    t5 = 1
  }
  if (tpc6 == 'on'){
    t6 = 1
  }
  if (tpc7 == 'on'){
    t7 = 1
  }
  if (tpc8 == 'on'){
    t8 = 1
  }

  tpcs = [t1,t2,t3,t4,t5,t6,t7,t8]
 
 student.tpc = tpcs

 console.log(student)

  Student.insert(student)
  .then(data => res.render('index'))
  .catch(err => res.render('error', {error: err}))
;
  });



module.exports = router;
