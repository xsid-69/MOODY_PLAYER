require('dotenv').config()
const App = require('./src/App')
const connectDb = require('./src/db/db')

connectDb();

App.listen(3000 , ()=>{
    console.log('Server is Running on port 3000');
    
})