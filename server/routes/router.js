const express = require('express');
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/*
GET Method - login
*/
route.get('/', services.homeRoutes);

/*
GET Method - for teacher
*/
route.get('/teacher', services.teacher);

/*
GET Method - for student
*/
route.get('/student', services.student);

route.get('/register', services.register);
  
route.get('/login',services.login);
/*
POST Method - add-student
*/
route.get('/add-student-result', services.add_student_result);
  
route.get('/error', services.error_page);
  
/*
PUT Method - update-student
*/
route.get('/update-student-result',services.update_student_result);

/*
GET Method - search-student
*/
route.get('/search-student-result',services.search_student_result);

//API

route.post('/api/save-user',controller.createuser);

route.get('/api/get-user',controller.findUser);


route.post('/api/save-result',controller.create);

route.get('/api/find-result',controller.find);

route.get('/api/get-result',controller.findByRollAndDOB);

route.put('/api/update-result/:id',controller.update);

route.delete('/api/delete-result/:id',controller.delete);


module.exports=route