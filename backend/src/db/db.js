const mongoose = require('mongoose');

function connectDb(){
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{
        console.log('Database Connected Successfully');
    })
    .catch((err)=>{
        console.log('Error in DB connection', err);
    })
}

module.exports = connectDb;