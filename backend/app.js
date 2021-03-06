const express = require('express')
const cors = require('cors')
const db = require("./models")
const dotenv = require('dotenv')
const userRoutes = require('./routes/userRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const quizzRoutes= require('./routes/quizzRoutes')
const questionRoutes = require('./routes/questionsRoutes')
const orderRoutes = require('./routes/orderRoutes')



const port = 5000;
const app = express()



app.use(express.json())
app.use(cors())
dotenv.config({path:'./config/config.env'})



///using routes 


app.use('/api/users',userRoutes)
app.use('/api/category',categoryRoutes)
app.use('/api/quizz',quizzRoutes)
app.use('/api/questions',questionRoutes)
app.use('/api/order',orderRoutes)

app.get ('/',(req,res) => {
    res.send("App is running")


})


db.sequelize.sync({alter:true}).then(() => {
    app.listen(port,() => {
        console.log(`Your app is running at http://localhost:${port}`);
        console.log('Your database Connected');
    })
}).catch((err) => {
    console.log(err)
})
