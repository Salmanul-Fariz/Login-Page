var express = require('express');
var router = express.Router();
var card = require('../public/javascripts/cards')

/* GET home page. */
var session;
router.get('/', function(req, res) {
  session = req.session;  
  if(session.user){
    res.redirect('/home')
  }else
    res.render('index', { title: 'Login Page'});
});
router.get('/home',(req,res) => {
  res.render('home',{card})
})

const useName = "abcd"
const password = "123"

router.post('/home',(req,res) => {
  var q = req.body 
  if(useName === q.USER && password === q.PASS){
    session = req.session
    session.user = q.USER
    res.render('home',{card})
  }else if(q.PASS !== password && q.USER !== useName){
    res.render('index',{allErr:'Invalid ID'})
  }else if(q.PASS !== password){
    res.render('index',{passErr:'Password is invalid'})
  }else if(q.USER !== useName){
    res.render('index',{userErr:'Username is invalid'})
  }
})
router.get('/logout',(req,res) => {
  req.session.destroy()
  res.render('index',{title:'Lgin Page'})
})



module.exports = router;
