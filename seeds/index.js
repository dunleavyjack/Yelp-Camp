const mongoose = require('mongoose');
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
}); 

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "5fb1ab4943ca5cc9ff6d88c3",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)}  ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus vero nostrum enim laudantium illum eius! Accusantium qui quia obcaecati tenetur labore voluptates, illo eius sint, in veritatis maxime velit sit.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/dyrywfcej/image/upload/v1605674280/YelpCamp/fjp7eskxojlrg1knwnrr.jpg',
                    filename: 'YelpCamp/fjp7eskxojlrg1knwnrr'
                },
                {
                    url: 'https://res.cloudinary.com/dyrywfcej/image/upload/v1605674273/YelpCamp/ydhdykw3djefoe6ly3ha.jpg',
                    filename: 'YelpCamp/ydhdykw3djefoe6ly3ha'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})