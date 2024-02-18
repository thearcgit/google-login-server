const mongoose = require("mongoose")

// establishing connection..........

const dbConnect = async (dbms) => {
    try {
        await mongoose.connect(dbms)
        console.log(`connectin established.....`)

    } catch (error) {
        console.log({
            msg: `oops unable to connect`,
            err: error
        })

    }

}

module.exports = dbConnect

