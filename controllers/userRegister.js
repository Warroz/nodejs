const User = require("../database/models/User")

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        console.log(req.body);
        
        if (error) {
            const registerError = Object.keys(error.errors).map(key => error.errors[key].message);

            req.flash('registerError', registerError)
            req.flash('data', req.body)

            return res.redirect('/user/create')
        }
        res.redirect('/user/login')
    })
}




// module.exports = (req, res) => {
//     console.log(req.body);
    
//    User.create(
//        req.body, (error, user) => {
//            console.log(error);
//            if (error) {
//                const registerError = Object.keys(error.errors).map(key => error.errors[key].message);
//                req.flash('registerError', registerError)
//                req.flash('data', req.body)
//                return res.redirect('/user/create')
//            }
//            res.redirect('/')
//        }
//    )
// }