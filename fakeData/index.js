const mongoose = require('mongoose');
const places = require('./places')
const {fakeOrgsOne, fakeOrgsTwo} = require('./fakeHelpers');
const Organization = require('../models/organization');

mongoose.connect('mongodb://localhost:27017/ngo-finder');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)]

const fakeDB = async () => {
    await Organization.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const randNum = Math.floor(Math.random()*1000);
        const org = new Organization({
            name: `${sample(fakeOrgsOne)} ${sample(fakeOrgsTwo)}`,
            location: `${places[randNum].city}`,
        })
        await org.save();
    }
}

fakeDB().then(() => {
    mongoose.connection.close();
    console.log("Closing connection.")
})