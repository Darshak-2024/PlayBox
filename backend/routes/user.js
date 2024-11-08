const express = require('express')
const router = express.Router();

const { signup, login } = require("../Controller/Auth");
const { auth, isuser,iscontentprovider,isAdmin } = require("../middleware/midw")

router.post("/signup", signup);
router.post("/login", login);


//  Route for user
router.get("/user", auth, isuser, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the user area."
    })
});

// Route for contentProvider
router.get("/contentProvider", auth,iscontentprovider, (req,res) => {
    res.json({
        success: true,
        message: "Welcome to the contentProvider area."
    })
})

//  Route for Admin 
router.get("/admin", auth, isAdmin, (req, res) => {
    res.json({
        success: true,
        message: "Welcome to the admin area."
    })
});

module.exports = router;