const mongoose = require('mongoose')

const Article = require('./database/models/Article')

mongoose.connect('mongodb://localhost:27017/blog-test');



Article.findByIdAndUpdate("5ccab758d827904f4bcc9417",
    { title: 'Superman' }, (error, post) => {

        // console.log(error, post);

    })
