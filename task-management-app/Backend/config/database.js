const mongoose = require('mongoose')
require('dotenv').config()
// console.log(process.env.CONNECTION_STRING)

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING,
            {
                useNewUrlParser: true, useUnifiedTopology: true
            }
);
        console.log(`database connection string ${connect.connection.host}`);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}
module.exports = dbConnect