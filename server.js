const express = require("express")
const app = express()
const mongoose = require('mongoose')
require('dotenv/config')
const expressLayouts = require("express-ejs-layouts")
const indexRouter = require('./routes/index')

// app settings
app.set('view engine', 'ejs')
app.set('views', __dirname + "/views")
app.set('layout', 'layouts/layout')

app.use(expressLayouts)
app.use(express.static('public'))

// app middlewares


// app routes
app.use('/', indexRouter)

// database connection
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
let db = mongoose.connection
db.once('open', () => {
    console.log("connected to database");
})

db.on('error', (error) => {
    console.error(`failed connecting to database: ${error}`);
})


// app listening
app.listen(3000, () => {
    console.log('running on port 3000');
})