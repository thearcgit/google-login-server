const express = require("express")
const cors = require("cors")
const passport = require("passport")
const OauthStrategy = require("passport-google-oauth2").Strategy
const session = require("express-session")
const admin = require("firebase-admin");
const {applicationDefault} = require("firebase-admin/app");
const {getMessaging} = require("firebase-admin/messaging");
// const serviceAccount = require("path/to/serviceAccountKey.json");
require("dotenv").config()

const PORT = process.env.PORT || 8080

admin.initializeApp({
  credential: applicationDefault(),
  projectId:"notification-66cc8"
});



const dbConnect = require("./dbConnection/database")
const userRouter = require("./routes/userRoute")
const { googleAuth } = require("./validations/googleLoginValidation")

const app = express()


// database connection............
dbConnect(process.env.DBMS)

// middleware......
app.use(cors({
    origin:"http://localhost:3000",
    methods:"GET,POST,PUT,PATCH,DELETE",
    credentials:true
}))
app.use(express.urlencoded({extended:false}))

app.use(express.json())

// Setup session
app.use(session({
    secret:"thisforgoogleauthlogin",
    resave:false,
    saveUninitialized:true
}))

// setpasport
// passport intialize............
app.use(passport.initialize())
app.use(passport.session())

googleAuth(passport,OauthStrategy)

// passport.use(new OauthStrategy({
// clientID:process.env.GOOGLE_CLIENT_ID,
// clientSecret:process.env.GOOGLE_SECRET_KEY,
// callbackURL: "/auth/google/callback",
// scope:["profile","email"]
// },
// async function(request, accessToken, refreshToken, profile, cb) {
// try {
    
//     let user = await UserModel.findOne({ googleId: profile.id });
//     if(!user){
//         user = new UserModel({
//             googleId:profile.id,
//             name:profile.displayName,
//             email:profile.emails[0].value,
//             image:profile.photos[0].value
//         })

//         await user.save()
//     }
//     return cb(null,user)
// } catch (error) {
//     return cb (error,null)
    
// }
// }
// ));




passport.serializeUser((user,cb) => {
    cb(null,user)
    
})
passport.deserializeUser((user,cb) => {

    cb(null,user)

})



// app.get("/",(req,res) =>{
//     res.send('httttttttttt')
// })





// routes .........

app.use("/",userRouter)





// listening ..........

app.listen(PORT,()=> {
    console.log("Server is running at port 8080")
})

