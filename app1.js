const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const { stripTags } = require('./helpers/hbs')


// user
const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

// controllers
// article
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')

// appel const

var app = express();

// app.get('/', function (req, res) {
//     res.render('index')
// })

const mongoStore = MongoStore(expressSession)

app.use(connectFlash())

app.use(expressSession({
    secret: 'securite',
    name: 'biscuit',
    saveUninitialized: true,
    resave: false,

    store: new mongoStore(
        { mongooseConnection: mongoose.connection }
    )
}))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())


const auth = require("./middleware/auth");


const redirectAuthSucess = require("./middleware/redirectAuthSucess")



mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useCreateIndex: true });

var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);


// post

app.use(express.static('public'));


// Route

app.engine('handlebars', exphbs({
    helpers: {
        stripTags: stripTags
    },
    defaultLayout: 'main'

}));
app.set('view engine', 'handlebars');
app.use('*', (req, res, next) => {
    res.locals.user = req.session.userId;
    console.log(res.locals.user);
    next()
})


// middleware
const articleValidPost = require('./middleware/articleValidPost')

app.get('/', homePage)

app.use('/article/post', articleValidPost)

app.use("/articles/add", auth)

app.get("/contact", function (req, res) {
    res.render('contact')
})

app.get('/articles/add', auth, articleAddController)
app.get('/articles/:id', articleSingleController)
app.post("/article/post", auth, articleValidPost, articlePostController)



// user

app.get('/user/create', redirectAuthSucess, userCreate)
app.post('/user/register', redirectAuthSucess, userRegister)
app.get('/user/Login', redirectAuthSucess, userLogin)
app.post('/user/LoginAuth', redirectAuthSucess, userLoginAuth)
app.get('/user/logout', userLogout)



app.listen(3000)
console.log('http://localhost:3000');


// contact

app.get("/contact", (req, res) => {
    res.render("contact")
})

app.use((req, res) => {
    res.render('error404')
})
