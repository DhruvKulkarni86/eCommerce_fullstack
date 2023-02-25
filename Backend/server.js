//Imports
const express = require('express')
const mongoose = require('mongoose')
const helmet = require('helmet')
const path = require('path')
const cors = require('cors')
require('dotenv').config()
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
var customParseFormat = require('dayjs/plugin/customParseFormat')
dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs().utcOffset(330)


//Intitialization
const app = express()
const port = process.env.PORT || 5000

var corsOptions = {
    origin: ['https://balajinursery.netlify.app','https://balaji-admin.netlify.app','http://localhost:3000','http://localhost:3001'],
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

const connectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}


//MongoDB Connection
mongoose.connect(process.env.dbURL, connectionOptions, (err) => {
    if(err) console.log(err)
})

const db = mongoose.connection
db.once('open', () => console.log('Connected To DB'))

//console.log("Formatted Date",dayjs().format('DD/MM/YYYY:HH-mm-ss'))
//console.log(dayjs("25/03/2022:16-12-48", "DD/MM/YYYY:HH-mm-ss").$d)
//console.log(port)
//console.log(dayjs().toISOString())
//console.log(dayjs().toDate())
//console.log("Default JS Date",dayjs().toDate())
//console.log(dayjs().utcOffset())
// console.log("DDDD", dd);

//Middleware
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())
app.use('/auth', require('./src/routes/authRoute'))
app.use('/customer', require('./src/routes/customerRoute'))
app.use('/product', require('./src/routes/productRoute'))
app.use('/cart', require('./src/routes/cartRoute'))
app.use('/transaction', require('./src/routes/paymentRoute'))
app.use('/stats', require('./src/routes/statsRoute'))

app.get('/', (req, res)=>{
    res.send("Hello");
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})