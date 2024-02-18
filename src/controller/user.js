const { nodemailerTransproter } = require("../features/nodemailer")
const UserModel = require("../models/userModel")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const {v4 : uuidv4} = require('uuid')


exports.userSignup = (async (req,res)=>{
    const {email,password} =req.body
    console.log('user',email,password)

    try {
        
        const user = new UserModel({email,password})
    
        await user.save()
    
        res.status(201).json({message:"user registered",user})
    } catch (error) {
        console.log('error',error)
        res.status(400).json({message:"Something is wrong",})
        
    }


})
exports.userLogin = (async (req,res)=>{
    // const {email,password} =req.body
    const user = req.user

    const transporter = nodemailerTransproter()

    try {

            // send mail with defined transport object
            const mail = await transporter.sendMail({
              from: 'abhay18d@gmail.com', // sender address
              to: user.email, // list of receivers
              subject: "LoggedIn succesfully.", // Subject line
              text: "You loggedin succesfully", // plain text body
            //   html: "<b>Hello world?</b>", // html body
            });

        
        // const user = new UserModel.findOne({email})
    
        res.status(200).json({message:"user succesfully loggedin ",user:user})
    } catch (error) {
        console.log('error',error)
        res.status(400).json({message:"Something is wrong",})
        
    }


})
exports.payment = async(req,res)=>{
    
    const {product, token} = req.body
    const idempotencyKey = uuidv4() 

    return stripe.customers.create({
        email:token.email,
        source:token.id
    })
    .then((customer)=> {
        return stripe.charges.create({
            amount:product.priec,
            currency:"INR",
            customerId:customer.id,
            description:`Purchase of ${product.name}`

        },{idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch((err)=> console.log('error',err))
}

const googleLogin = ((req,res) => {

})

// module.exports = {userSignup}