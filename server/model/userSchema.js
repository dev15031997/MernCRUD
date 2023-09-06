const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    work: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    messages: [{
        message: {
            type: String,
            required: true
        }
    }],
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
    Date: {
        type: Date,
        default: Date.now
    }
})

// Hashing the user password
userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    next()
})

// Token Generate
userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({ token: token })
        await this.save()
        return token;
    }
    catch (error) {
        console.log(error)
    }
}

// Message Store
userSchema.methods.sendMessage = async function (message) {
    try {
        this.messages = this.messages.concat({ message: message });
        await this.save;
        return this.messages;
    } 
    catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('user', userSchema);

module.exports = User;