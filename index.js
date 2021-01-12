const express = require('express');
const ejs = require('ejs');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
require('./passport-setup')

app.use(express.static(__dirname + '/static'));
app.use(cors())
app.use(bodyparser.urlencoded({ extended: false }))
app.set('view-engine','ejs')
app.use(bodyparser.json())
app.use(cookieSession({
    name: 'tutosession',
    keys: ['key1', 'key2']
}))

const islogin = (req, res, next) => {
    if (req.user)
    next()
    else
    res.sendStatus(401)
}
app.use(passport.initialize());
app.use(passport.session());
app.get('/', (req, res) => {
    res.render('start.ejs')
})

app.get('/failure', (req, res) => {
    res.send('Failed')
})

app.get('/success',islogin, (req, res) => {
    res.render('profile.ejs',
    {name:req.user.displayName,
    pic:req.user.photos[0].value
    })
})

app.get('/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/failure'
    }),(req,res)=>{
        res.redirect('/success')
    });

app.get('/logout',(req,res)=>{
    req.session = null;
    req.logOut();
    res.redirect('/')
})
app.listen(3000, () => {
    console.log('Server started at port 3000');
})