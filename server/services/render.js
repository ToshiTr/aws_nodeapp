const axios = require('axios');

const apiBaseUrl = process.env.API_BASE_URL; 

exports.homeRoutes = (req,res) =>{
  //render login page
   res.render('login');
}

exports.register = (req,res) =>{
    //show search page to search their result to student
    res.render('register_user');
}

exports.login = (req,res) =>{

    axios.get(`${apiBaseUrl}/api/get-user`,
    {params : {name : req.query.name, email : req.query.email, usertype: req.query.usertype}})
    .then(function(resultdata){
       if(resultdata.data.usertype == 'Teacher')
        {
            res.redirect('/teacher');
        }else if(resultdata.data.usertype == 'Student'){
            res.redirect('/student');
        }else{
            res.render('notfound',{message: 'Some error occur while retrieving data'});
        }
    })
    .catch(err=>{
     console.log(err.message);
     res.render('notfound',{message: err.message});
    })

}

exports.teacher = (req,res) =>{

    //make api request to get results
    axios.get(`${apiBaseUrl}/api/find-result`)
    .then(function(response){
        res.render('index',{results : response.data});
    })
    .catch(err=>{
        res.send(err);
    });
}

exports.student = (req,res) =>{
    //show search page to search their result to student
    res.render('search_result');
}

exports.add_student_result = (req,res) =>{
    res.render('add_student_result');
}

exports.error_page = (req,res) =>{
    res.render('error');
}

exports.update_student_result =  (req,res) => {
    axios.get(`${apiBaseUrl}/api/find-result`,{params : {id : req.query.id}})
    .then(function(resultdata){
        res.render('update_student_result',{result : resultdata.data})
    })
    .catch(err=>{
     res.send(err);
    })
}

exports.search_student_result = (req, res) => {
 
    axios.get(`${apiBaseUrl}/api/get-result`,{params : {rollno : req.query.rollno, dob : req.query.dob}})
    .then(function(resultdata){
        res.render('student_result',{result : resultdata.data})
    })
    .catch(err=>{
     console.log(err.message);
     res.render('notfound',{message: err.message});
    })
}