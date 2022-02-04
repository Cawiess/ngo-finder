const mongoose = require('mongoose');
//const places = require('./places')
const {fakeOrgsOne, fakeOrgsTwo} = require('./fakeHelpers');
const Organization = require('../models/organization');

const fs = require('fs');

const rawdata = fs.readFileSync('./places.json');
const places = JSON.parse(rawdata);

console.log(places[10].city)


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
        const randNum = Math.floor(Math.random()*places.length);
        const randNumEmployees = Math.floor(Math.random()*20) + 10;
        console.log('hi!', places[randNum])
        const org = new Organization({
            name: `${sample(fakeOrgsOne)} ${sample(fakeOrgsTwo)}`,
            location: `${places[randNum].city}`,
            numEmployees: randNumEmployees,
            description: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit officia, maiores vel itaque eum magnam officiis enim molestias provident, sit a. Delectus sint magnam voluptatum incidunt quo. Dolor, voluptas laudantium?"
            
        })
        await org.save();
    }
}

fakeDB().then(() => {
    mongoose.connection.close();
    console.log("Closing connection.")
})


