const express = require('express')
const app = express();
require("dotenv").config()
const indexRouter = require('./router/index')



const errorHandler = require("./middlewares/errorHandler")
const morgan = require('morgan')



const PORT = process.env.PORT
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) 
app.use(morgan(':method :url :status - :response-time ms'))

const cors = require("cors")
app.use(cors())


app.use('/', indexRouter)


// Global Error Handler
app.use(errorHandler)


app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});


