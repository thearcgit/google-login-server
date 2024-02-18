
const passport = require("passport")
const OauthStrategy = require("passport-google-oauth2").Strategy

passport.use(new OauthStrategy({
    clientID:process.env.GOOGLE_CLIENT_ID,
    clientSecret:process.env.GOOGLE_SECRET_KEY,
    callbackURL: "/auth/google/callback",
    scope:["profile","email"]
  },
  async function(request, accessToken, refreshToken, profile, cb) {
    console.log('profile',profile)
    try {
        
        let user = await UserModel.findOne({ googleId: profile.id });
        if(!user){
            user = new UserModel({
                googleId:profile.id,
                name:profile.displayName,
                email:profile.emails[0].value,
                image:profile.photos[0].value
            })

            await user.save()
        }
        return cb(null,user)
    } catch (error) {
        return cb (error,null)
        
    }
  }
));

// Initialize google auth login....


app.get("/auth/google",passport.authenticate("google",{scope:["profile","email"]}))

app.get("/auth/google/callback",passport.authenticate("google",{
    successRedirect:"http://localhost:3000",
    failureRedirect:"http://localhost:3000/login"
}))