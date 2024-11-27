const exp= require('constants')
const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))

const key = '0a6b8708bb0f2bb769a61a7be374bef5'
let city = 'Tartu'

app.get('/', (req, res)=> {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then ((response) => {
        return response.json()
    })
    .then((data)=> {
        let description = data.weather[0].description
        let city = data.name
        let temp = Math.round(parseFloat(data.main.temp)-273.15)
        console.log(description)
        console.log(city)
        console.log(temp)
    })
    res.render('index')
})

app.listen(3002)