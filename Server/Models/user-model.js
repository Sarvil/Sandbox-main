"use strict";
var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    DOB: {
        type: Date,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
});

userSchema.pre("save", async function (next) {
    const user = this;

    if (!user.isModified('password')) {
        next();
    }
    try {
        const saltRound = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password, saltRound);
        user.password = hash_password;
    } catch (error) {
        next(error);
    }
});

userSchema.methods.generateToken = async function () {
    try {
        return jwt.sign(
            {
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "30d",
            }
        );
    } catch (error) {
        next(error);
    }
};

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

var User = new mongoose.model("User", userSchema);

module.exports = User;