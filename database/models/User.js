const bcrypt = require('bcryptjs')

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'Le nom est obligatoire']
    },


    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true,
    },

    gender: {
        type: String,
        enum: ["M", "F"]

    },

    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire"]
    },

    city: {
        type: String,
        required: [true, "La ville est obligatoire"]
    },

    country: {
        type: String,
        required: [true, "Le pays est obligatoire"]
    },

})



UserSchema.pre('save', function (next) {
    const user = this
    bcrypt.hash(user.password, 10, (error, encrypted) => {
        console.log(UserSchema);
        user.password = encrypted
        next()
    })
})



module.exports = mongoose.model('User', UserSchema)
