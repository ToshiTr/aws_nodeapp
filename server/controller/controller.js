var resultDb = require('../model/model');

var userDb = require('../model/user');

//create and save new student's result
exports.createuser = (req, res) => {

    //validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty' });
        return;
    }

    //new user
    const user = new userDb({
        name: req.body.name,
        email: req.body.email,
        usertype: req.body.usertype
    });

    //save user in db

    user
    .save(user)
    .then(data => {
        res.redirect('/');
    })
    .catch(err => {
        res.status(500).redirect('/error');
})

}

exports.findUser = (req, res) =>{

    const filter = {
        name: req.query.name,
        email: req.query.email,
        usertype: req.query.usertype,
    };
    // Find documents that match both conditions
    if (req.query.name && req.query.email && req.query.usertype) {
        userDb.findOne(filter)
            .then(result => {
                if (result) {
                    res.send(result);
                } else {
                    res.status(500).send({
                        message: err.message || `No data found with`
                    });
                }
            })
            .catch(err => {

                res.status(500).send({
                    message: err.message || 'Error occur while retrieving result'
                });
            });

    }

}

exports.create = (req, res) => {

    //validate request
    if (!req.body) {
        res.status(400).send({ message: 'Content cannot be empty' });
        return;
    }

    const date = new Date(req.body.dob);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    const formattedDate = `${year}-${month}-${day}`;

    //new student result
    const student_result = new resultDb({
        rollno: req.body.rollno,
        name: req.body.name,
        dob: formattedDate,
        score: req.body.score,
    });

    //save student result in db
    student_result
        .save(student_result)
        .then(data => {
            // res.send(data);
            res.redirect('/add-student-result');
        })
        .catch(err => {

            res.status(500).redirect('/error');
        })
}

//retrieve a all students result / retrieve a single student result
exports.find = (req, res) => {

    const filter = {
        rollno: req.query.rollno,
        dob: req.query.dob,
    };

    // Find documents that match both conditions
    if (req.query.rollno || req.query.dob) {

        resultDb.find(filter)
            .then(result => {
                if (res.body) {
                    console.log(res);
                    console.log("Sending result...");
                    res.send(result);
                } else {
                    console.log("No data found");
                }
            })
            .catch(err => {
                console.log(" Errr " + err.message);
                res.status(500).send({
                    message: err.message || 'Error occur while retrieving result'
                });
            });

    }

    else if (req.query.id) {
        const id = req.query.id;
        resultDb.findById(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({ message: "Not user found with id" + id });
                } else {
                    res.send(data);
                }
            })
            .catch(err => {
                res.status(500).send({ message: "Error retrieving student result with id " + id });
            })
    }
    else {

        resultDb.find()
            .then(result => {
                res.send(result);
            })
            .catch(err => {
                res.status(500).send({
                    message: err.message || 'Error occur while retrieving result'
                })
            });
    }

}

//update student's result by student's id
exports.update = (req, res) => {

    //validate request
    if (!req.body) {
        res.status(400).send({ message: 'Data to update cannot be empty' });
        return;
    }

    const id = req.params.id;

    // Update all documents that match the query
    resultDb.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(400).send({ message: `Cannot update student result with roll no ${id}` });
            } else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({ message: "Error update user information" });
        })
}

//delete a student's result by student's id
exports.delete = (req, res) => {

    const id = req.params.id;
    resultDb.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: `Cannot delete with id ${id}. Maybe id is wrong` });
            } else {
                res.send({
                    message: "User was deleted successfully!"
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `Couldn't delete user with id ${id}`
            })
        })
}


//retrieve a all students result / retrieve a single student result
exports.findByRollAndDOB = (req, res) => {

    const filter = {
        rollno: req.query.rollno,
        dob: req.query.dob,
    };

    // Find documents that match both conditions
    if (req.query.rollno || req.query.dob) {
        resultDb.findOne(filter)
            .then(result => {
                if (result) {
                    res.send(result);
                } else {
                    console.log("No data found");
                    res.status(500).send({
                        message: err.message || `No data found with roll ${filter.rollno} and ${filter.dob}`
                    });
                }
            })
            .catch(err => {

                res.status(500).send({
                    message: err.message || 'Error occur while retrieving result'
                });
            });

    }

}