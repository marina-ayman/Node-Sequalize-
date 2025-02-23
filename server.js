const express = require('express');
const app = express();
require("dotenv").config()
const passport = require('passport')
const sequelize = require("./config/database")
const { sequelizeModels } = require('./models');
// require("./seeders/insertUser.js")
const webRouter = require("./router/web.js") 
const adminRouter = require("./router/admin.js") 
const errorHandler = require("./middlewares/errorHandler")
const morgan = require('morgan')
// npm install express sequelize mysql2 dotenv
const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 
app.use(morgan(':method :url :status - :response-time ms'))

const cors = require("cors")
app.use(cors())

app.get('/', (req, res) => {
  res.send('Express!')
})

require('./config/passport')(passport);
// require('./config/passport-apikey')(passport);
// require('./config/passport-facebook')(passport);
// require('./config/passport-google')(passport);




app.use(passport.initialize())

app.use((req,res , next)=>{
  console.log('mmmmmm',req.originalUrlrs)
  next()
}) 

app.use("/web", webRouter)
app.use("/admin", adminRouter)



// Global Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});


