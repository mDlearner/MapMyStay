const mongoose = require('mongoose');
const initdata = require('./data');
const Listing = require('../models/listings');

main()
.then(() => {
  console.log('MongoDB connected');
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/easyStay');
}
async function seedDB() {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
};
seedDB()
    .then(() => {
        console.log('Database seeded');
        mongoose.connection.close();
    })
    .catch(err => {
        console.log(err);
        mongoose.connection.close();
    });