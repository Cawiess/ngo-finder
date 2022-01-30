const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Organization = require('./models/organization');

mongoose.connect('mongodb://localhost:27017/ngo-finder');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/organizations', async (req, res) => {
    const organizations = await Organization.find({});
    res.render('organizations/index', {organizations})
})



app.listen(3000, () => {
    console.log('Serving on port 3000')
})