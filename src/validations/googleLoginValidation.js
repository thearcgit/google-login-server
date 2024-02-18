const { nodemailerTransproter } = require("../features/nodemailer");
const UserModel = require("../models/userModel")

exports.googleAuth = (passport, OauthStrategy) => {
    passport.use(new OauthStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_SECRET_KEY,
        callbackURL: "/auth/google/callback",
        scope: ["profile", "email"]
    },
        async function (request, accessToken, refreshToken, profile, cb) {
            console.log('authttt')
            try {

                let user = await UserModel.findOne({ googleId: profile.id });
                if (!user) {
                    user = new UserModel({
                        googleId: profile.id,
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        image: profile.photos[0].value
                    })

                    await user.save()
                    const transporter = nodemailerTransproter()


                    // send mail with defined transport object
                    await transporter.sendMail({
                        from: 'abhay18d@gmail.com', // sender address
                        to: user.email, // list of receivers
                        subject: "Google registration.", // Subject line
                        text: "You are registered succesfully.", // plain text body
                        //   html: "<b>Hello world?</b>", // html body
                    });
                }
                return cb(null, user)
            } catch (error) {
                return cb(error, null)

            }
        }
    ));
}