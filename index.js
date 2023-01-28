const express = require('express');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser')
const userRoute = require('./web/userRoute');
const adminRoute = require('./web/adminRoute');
// import db connection
require('./db/conn')

// use middlewares
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// use static folder
app.use('/public',express.static(path.join(__dirname, 'public')))
app.use(express.static('files'))
// view engine
app.set('view engine', 'ejs')

// user route
app.use('/',userRoute)

// admin route
app.use('/admin',adminRoute)

const port = 5000 || process.env.PORT;

app.listen(port, () => {
    console.log('app is running on server');
})

