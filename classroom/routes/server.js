const express = require('express');
const app = express();
const path = require('path');

const session = require('express-session');
app.set('views engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
const flash = require('connect-flash' );
const { name } = require('ejs');
const sessionOptions = {
    secret:"mySuperSecretString",
    resave:false,
    saveUninitialized:true
}


app.use(session(sessionOptions))
app.use(flash())

app.get('/', (req,res)=> {
    res.send('hello world')
})
app.get('/register', (req,res)=> {
    let {name = 'anonymous'} = req.query;
    req.session.name = name;
   req.flash('success', 'user registered successfully')
})

app.get('/hello', (req,res)=> {
    res.render('page.ejs', {name: req.session.name})
})
app.get('/test', (req,res)=> {
    res.send('test succesful')
})

app.listen(3000, (req,res)=> {
    console.log("server is working")
})