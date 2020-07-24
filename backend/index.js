var express = require('express');
var bodyParser = require("body-parser");
var cors = require('cors');
const {java_compilation_path, java_execution_path , python2_execution_path , python3_execution_path , c_compilation_path , cpp_compilation_path} = require('./pathvariable');
const {c, cpp, node, python, java} = require('compile-run');
var app = express();
var fs = require('fs');

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/' , (req,res) => {
    res.send('Hello World');
})

app.post('/compile' , (req,res) => {
    console.log(req.body);
    if(req.body.lang == "java"){
        fs.writeFile('Solution.java', req.body.code, function (err) {
            if (err)  console.log(err);
            else {
                console.log("File Created");
                java.runFile('./Solution.java',{ stdin:'3\n2\n'},{
                    compilationPath: java_compilation_path,
                    executionPath: java_execution_path
                }).then(
                    result=>{
                        console.log(result)
                        res.send(result)
                    }
                ).catch(err =>{ 
                    console.log(err)
                    res.send(err)
                });
                
            }
        });
    } else if (req.body.lang == "c"){
        fs.writeFile('Solution.c', req.body.code, function (err) {
            if (err)  console.log(err);
            else {
                console.log("File Created " + c_compilation_path);
                c.runFile('Solution.c',{ stdin:'3\n2\n'},{
                    compilationPath: c_compilation_path
                }).then(
                    result=>{
                        console.log(result)
                        res.send(result)
                    }
                ).catch(err =>{ 
                    console.log(err)
                    res.send(err)
                });
            }
        });
    } else if (req.body.lang == "c++"){
        fs.writeFile('Solution.cpp', req.body.code, function (err) {
            if (err)  console.log(err);
            else {
                console.log("File Created");
                cpp.runFile('./Solution.cpp',{ stdin:'3\n2\n'},{
                    compilationPath: cpp_compilation_path
                }).then(
                    result=>{
                        console.log(result)
                        res.send(result)
                    }
                ).catch(err =>{ 
                    console.log(err)
                    res.send(err)
                });
            }
        });
    } else if (req.body.lang == "python2"){
        fs.writeFile('Solution.py', req.body.code, function (err) {
            if (err)  console.log(err);
            else {
                console.log("File Created");
                python.runFile('./Solution.py',{ stdin:'3\n2\n'},{
                    executionPath : python2_execution_path
                }).then(
                    result=>{
                        console.log(result)
                        res.send(result)
                    }
                ).catch(err =>{ 
                    console.log(err)
                    res.send(err)
                });
            }
        });
    } else if (req.body.lang == "python3"){
        fs.writeFile('Solution.py', req.body.code, function (err) {
            if (err)  console.log(err);
            else {
                console.log("File Created");
                python.runFile('./Solution.py',{ stdin:'3\n2\n'},{
                    executionPath : python3_execution_path
                }).then(
                    result=>{
                        console.log(result)
                        res.send(result)
                    }
                ).catch(err =>{ 
                    console.log(err)
                    res.send(err)
                });
            }
        });
    } 
    
})
app.listen(3001);
console.log("Server running on port 3001");