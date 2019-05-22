const path = require('path');
const Post = require("../database/models/Article")
module.exports = (req, res) => {
    const { image } = req.files
    const uploadFile = path.resolve(__dirname, "..", 'public/articles', image.name)





    image.mv(uploadFile, (error) => {
        Post.create(
            {
                ...req.body,
                image: '/articles/${image.name}'
            }


            , (error, post) => {
                res.redirect('/')



            })

    })


    console.log(req.files);
    console.log(req.body);





}


