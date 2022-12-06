const bodyParser = require('body-parser');
const express = require('express');
const ejs = require('ejs');
const { google } = require('googleapis');
const { assuredworkloads } = require("googleapis/build/src/apis/assuredworkloads");
// const { route } = require('./routes/registrationRoutes');
const registrationRoutes = require("./routes/registrationRoutes")
const registerationEb_Routes = require("./routes/registrationEB_Route");
const commiteeRoutes = require("./routes/commitee");
const app = express();


const port = process.env.PORT || 4000;

app.use(express.static('public'));
app.set('view engine', 'ejs');
require('dotenv').config();
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.render('index');
})

app.use('/registration', registrationRoutes);

app.use('/registration_for_EB', registerationEb_Routes);

app.use('/commitee', commiteeRoutes);

app.get('/thankyou', function (req, res) {
    res.render('thankyou');
});

app.get('/404',(req,res)=>{
    res.render('404')
})

app.get('/founders', (req, res) => {
    res.render('founders');
})

app.get('/exordium', function (req, res) {
    res.render('exordium');
})
app.get('/team', (req, res) => {
    res.render('404');
})

app.get('/preparation', (req, res) => {
    res.render('preparation')
})


app.listen(port, () => {
    console.log("http://localhost:4000")
})  