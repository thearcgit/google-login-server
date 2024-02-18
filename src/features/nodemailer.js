const nodemailer = require("nodemailer")

exports.nodemailerTransproter = () => {
    return nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: "abhay18d@gmail.com",
          pass: process.env.NODEMAILER_PASSWORD,
        },
      });
      

}
