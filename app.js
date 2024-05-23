const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')

const app = express();
app.use(bodyParser.json());
app.use('/api', indexRouter)
app.use(express.urlencoded({extended: true}))

const mongoUrI = 'mongodb://127.0.0.1:27017/todo-demo'

mongoose
    .connect(mongoUrI, {useNewUrlParser: true})
    .then(() => {
        console.log('mongoose connected')
    })
    .catch((err) => {
        console.log(err)
    })

app.listen(3000, () => {
    console.log('server connected')
})