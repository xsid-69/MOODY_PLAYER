const express = require('express')
const songRoutes = require('./routes/song.routes')
const cors = require('cors')

const App = express()
App.use(express.json())
App.use(cors())
App.use('/',songRoutes)

module.exports = App;