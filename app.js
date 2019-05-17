const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileupload = require('express-fileupload');
const expressSession = require('express-session');
const MongoStore = require('connect-mongo');
const connectFlash = require('connect-flash');
const { stripTags } = require("./helpers/hbs");

// const path = require('path');



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
const articleValidPost = require('./middleware/articleValidPost') /*(req, res, next) => {
    if(!req.files) {
        return res.redirect('/')
    }
    console.log("je suis le middleware");
    next()
}
*/

// mongoose
mongoose.connect('mongodb://localhost:27017/blog', { useNewUrlParser: true, useCreateIndex: true });

// handlebars
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
MomentHandler.registerHelpers(Handlebars);

// // post
// const Post = require("./database/models/Article")

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

// route USER
app.use("/article/post", articleValidPost)
app.use("/articles/add", auth)

// route PAGES
app.get("/", homePage);
app.get("/tristan", tristanPage);
app.get("/user/register", userRegister);

app.get("/contact", function (req, res) {
    res.render("contact")
})

// Articles
app.get("/articles/add", auth, articleAddController)
// res.render("articles")
app.get("/articles/:id", articleSingleController)
// async (req, res) => {
//     const article = await Post.findById(req.params.id)
//     res.render("articles", {article})
// })

// app.get ("/article/add", (req, res) => {
//     res.render("article/add")
// })
app.post("/article/post", auth, articleValidPost, articlePostController)


// (req, res) => {
//     const {image} = req.files
//     const uploadFile = path.resolve(__dirname, 'public/articles', image.name)

//     image.mv(uploadFile, (error) => {
//         Post.create(
//             {
//                 ...req.body,
//                 image: `/articles/${image.name}`
//             }

//             , (error, post) => {
//             res.redirect("/")
//         })
//     })


// user

app.get('/user/create', redirectAuthSucess, userCreate)
app.post('/user/register', redirectAuthSucess, userRegister)
app.get('/user/Login', redirectAuthSucess, userLogin)
app.post('/user/LoginAuth', redirectAuthSucess, userLoginAuth)
app.get('/user/logout', userLogout)

// console.log(req.body);
// })





// contact

// app.get("/contact", (req, res) => {
//     res.render("contact")
// })
// app.use((req, res) => {
//     res.render('error404')
// })


app.listen(8000, () => {

    //console.log("Le serveur tourne sur le port 3000");
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

