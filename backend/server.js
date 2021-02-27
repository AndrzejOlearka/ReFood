const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const mainRoutes = require("./routes/main")
const europeRoutes = require("./routes/europe")
const australiaRoutes = require("./routes/australia")
const americaRoutes = require("./routes/america")
const asiaRoutes = require("./routes/asia")
const africaRoutes = require("./routes/africa")
const panelRoutes = require("./routes/panel")

require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000

app.use(cors());
app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})

app.use('/', mainRoutes)
app.use('/europe', europeRoutes)
app.use('/australia', australiaRoutes)
app.use('/asia', asiaRoutes)
app.use('/america', americaRoutes)
app.use('/africa', africaRoutes)
app.use('/panel', panelRoutes)

const url = process.env.ATLAS_URI;
//const url = 'mongodb://127.0.0.1:27017/league'
mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})
const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB runs good');
})
/*

*/