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


// GET /students/id
router.get('/students/:id', function(req, res,next) {
  // Data retrieve
  Student.lookUp(req.params.id)
    .then(data => res.render('info_student', { aluno : data }))
    .catch(err => res.render('error', {error: err}))
  ;
});





module.exports = router;
