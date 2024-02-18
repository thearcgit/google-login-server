const express = require("express")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const {v4 : uuidv4} = require('uuid')
const passport = require("passport")

const {userSignup, payment, userLogin} = require("../controller/user")

const router = express.Router()

router.get("/",(req,res)=>{
    res.send("server is called.")
})

router.post("/signup", userSignup)
router.get("/login", userLogin)
router.post("/payment",payment)
router.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

router.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000",
    failureRedirect:"http://localhost:3000/login"
}))




module.exports = router