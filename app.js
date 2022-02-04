const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const Organization = require('./models/organization');

mongoose.connect('mongodb://localhost:27017/ngo-finder');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const app = express();

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));


app.get('/', (req, res) => {
    res.render('home')
})

app.get('/organizations', async (req, res) => {
    const organizations = await Organization.find({});
    res.render('organizations/index', {organizations});
})

app.get('/organizations/new', (req, res) => {
    res.render('organizations/new');
})

app.post('/organizations', async(req, res) => {
    //res.send(req.body);
    const organization = new Organization(req.body.organization);
    await organization.save();
    res.redirect(`/organizations/${organization._id}`)

})

app.get('/organizations/:id', async (req, res) => {
    const organization = await Organization.findById(req.params.id);
    res.render('organizations/show', {organization});
})

app.get('/organizations/:id/edit', async (req, res) => {
    const organization = await Organization.findById(req.params.id);
    res.render('organizations/edit', {organization});
})

app.put('/organizations/:id', async(req, res) => {
    //res.send("I WORK!");
    const { id } = req.params;
    const organization = await Organization.findByIdAndUpdate(id, {...req.body.organization}, {new: true});
    res.redirect(`/organizations/${organization._id}`)
})

app.delete('/organizations/:id', async (req, res) => {
    const { id } = req.params;
    await Organization.findByIdAndDelete(id);
    res.redirect('/organizations');
});

app.use((req, res) => {
    res.status(404).send('Not found!')
})





app.listen(3000, () => {
    console.log('Serving on port 3000')
})