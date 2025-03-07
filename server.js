const express = require('express');
const app = express();
require("dotenv").config()
const sequelize = require("./config/database")
const { sequelizeModels } = require('./models');
// require("./seeders/insertUser.js")
const webRouter = require("./router/web.js") 
const adminRouter = require("./router/admin.js") 
const aclRouter = require("./router/aclRoutes.js") 

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

// require('./config/passport-apikey')(passport);
// require('./config/passport-facebook')(passport);
// require('./config/passport-google')(passport);
// require('./config/webpassport.js')(passport);
const passport = require('passport');

app.use(passport.initialize());


app.use("/web", webRouter)
app.use("/admin", adminRouter)
app.use("/acl", aclRouter)

// Global Error Handler
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});


