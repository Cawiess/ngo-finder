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

app.get('/makeorganization', async (req, res) => {
    const org = new Organization({
        name: 'TestOrg',
        numEmployees: 1,
        description: 'Not much to say',
        location: 'only in imagination'
    })
    await org.save();
    res.send(org);
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})