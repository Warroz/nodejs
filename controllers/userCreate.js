module.exports = (req, res) => {
    res.render('partials/register', {
        errors: req.flash('registerError'),
        data: req.flash('data')[0]
    })
}






