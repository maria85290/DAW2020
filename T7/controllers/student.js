// Student controller

var Student = require('../models/student')

// Returns student list
module.exports.list = () => {
    return Student
        .find()
        .sort({nome:1})
        .exec()
}

// Encontra um aluno pelo seu id
module.exports.lookUp = id => {
    return Student
        .findOne({numero: id})
        .exec()
}

//insere um novo aluno
module.exports.insert = student => {
    var newStudent = new Student(student)
    return newStudent.save()
}

// apaga um aluno dado o seu ID
module.exports.delete = id => {
    return Student.deleteOne({ numero: id });
};


// Atualiza os dados de um aluno dado o seu ID:
module.exports.update = student=> {
    return Student.updateOne({ numero: student.numero },{numero:student.numero , nome:student.nome, git:student.git, tpc:student.tpc});
};

