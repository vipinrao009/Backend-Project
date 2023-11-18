const mongoose = require('mongoose')

const connectToDB = ()=>{

    mongoose.connect(process.env.MONGO_URL)
    
    //if the db is connected the print the message on terminal
    .then((conn)=>{
        console.log(`DB is connected:${conn.connection.host}`);
    })

    //if DB is not connected then print the erroe on the terminal
    .catch((Error)=>{
        console.log(Error.message);
        process.exit(1)
    })
}

module.exports = connectToDB;


