require('dotenv').config()
const express =  require('express')
const mongoose = require('mongoose')
const routes = require('./routes/index')
const cors = require('cors')
const multer = require('multer')
const app = express()
const port = process.env.PORT
const cookieParser = require('cookie-parser')
const upload = multer({ dest: 'uploads/' })


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors())
app.use(cookieParser())
routes(app)

mongoose.connect(`${process.env.MONGO_DB}`)
.then(() => {
    console.log('Connect DB Success')
})
.catch((err) => {
    console.log('Connect DB error:' + err)
})

app.listen(port,() =>{
    console.log('Server is running in port:'+ port)
})
