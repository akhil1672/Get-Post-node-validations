const express = require('express');
const bodyparser = require('body-parser');
const handlebars = require('express-handlebars');
let app=express();
app.engine(".hbs",handlebars({extname:'.hbs',defaultLayout:'ex.hbs'}));
app.set('view engine','.hbs');
app.set('views','./views');
app.use(bodyparser());
let validget = function(req,res,next){
    var username = req.query.username;
    var password = req.query.password;
    if (!username | !password) {
        res.render('geterr',{title:"GETERR"});
    } 
    else
        next();     
};
let validpost = function(req,res,next){
    var nickname=req.body.nickname;
    if(!nickname)
    {
        res.render('posterr',{title:"POSTERR"});
    }
    else
        next();    
};
app.get('/',validget,function(req,res){
        console.log("GET");
        //res.send("This is get method");
        res.render('get',{title:'GET'});
});
app.post('/',validpost,function(req,res){
    console.log("POST");
   // res.send("This is post method");
    res.render('post', {title:'POST'});
});
app.use((err,req,res,next)=>{
    if(err){
        res.send(`<h1>ERROR</h1>`);
    }
});
app.listen(8080,console.log("LISTENING!!"));