const jwt = require("jsonwebtoken")
require("dotenv").config();


exports.auth = (req, res, next) => {
    try {
        const token = req.body.token||req.cookies.token;
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "token missing"
            })
        }
        
        //Verify the token 
        try {
            const userdata = jwt.verify(token, process.env.JWT_SECRET);
            //console.log(decode)
            req.user = userdata;
        }
        catch (e) {
            return res.status(401).json({
                success: false,
                message: "token is invalid"
            })
        }

        next();
    }
    catch (err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Something went wrong while verifying token"
        })
    }
}

exports.isuser = (req, res, next) => {
    try {
        if (req.user.role !== "user") {
            return res.status(401).json({
                success: false,
                message: "Oops! This page is only accessible to user."
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role is not Matching"
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({
                success: false,
                message: "Oops! This page is only accessible to admin."
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role is not Matching"
        })
    }
}

exports.iscontentprovider = (req, res, next) => {
    try {
        if (req.user.role !== "contentProvider") {
            return res.status(401).json({
                success: false,
                message: "Oops! This page is only accessible to contentprovider."
            })
        }
        next();
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "user role is not Matching"
        })
    }
}