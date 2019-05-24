const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const { stripTags } = require("./helpers/hbs");





// Controllers //
// article
const articleSingleController = require('./controllers/articleSingle')
const articleAddController = require('./controllers/articleAdd')
const articlePostController = require('./controllers/articlePost')
const homePage = require('./controllers/homePage')
const tristanPage = require('./controllers/tristanPage')

// user 

const userCreate = require('./controllers/userCreate')
const userRegister = require('./controllers/userRegister')
const userLogin = require('./controllers/userLogin')
const userLoginAuth = require('./controllers/userLoginAuth')
const userLogout = require('./controllers/userLogout')

// login

const app = express();

mongoose.connect('mongodb://localhost:27017/blog-tristan2', { useNewUrlParser: true, useCreateIndex: true });

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

// repertoire
app.use('/assets', express.static('public'));
app.use(express.static('public'));

// body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileupload())

// middleware
const auth = require("./middleware/auth");
const redirectAuthSucess = require("./middleware/redirectAuthSucess")


// Middleware
const articleValidPost = require('./middleware/articleValidPost')



// handlebars
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);



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
    next()
})

// route USER
app.use("/article/post", articleValidPost)
// app.use("/ajout/add", auth)

// route PAGES
app.get("/", homePage);
app.get("/tristan", tristanPage);
app.post("/user/register", userRegister);
app.post("/user/login", userLogin);


app.get("/articles", function (req, res) {
    res.render("articles")
})


app.get("/contact", function (req, res) {
    res.render("contact")
})

// Articles
app.get("/ajout/add", articleAddController)
                //   auth
app.get("/articles/:id", articleSingleController)
app.post("/article/post", auth, articleValidPost, articlePostController)



// user

app.get('/user/create', redirectAuthSucess, userCreate)
app.get('/user/login', redirectAuthSucess, userLogin)
app.get('/user/logout', userLogout)
app.post('/user/LoginAuth', redirectAuthSucess, userLoginAuth)
app.post('/user/register', redirectAuthSucess, userRegister)



app.listen(8000, () => {

    console.log("Le serveur tourne sur le port 8000");
    console.log(`http://localhost:8000`);
})




// function updateTransition() {
// var el = document.querySelector("div.four");

// if (el) {
//     el.className = "four";
// } else {
//     el = document.querySelector("div.four1");
//     el.className = "four";
// }

// return el;


// var intervalID = window.setInterval(updateTransition, 7000);

