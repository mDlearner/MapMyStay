const mongoose = require('mongoose');
const initData = require('./data');
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
    initData.data =initData.data.map((obj) => ({ ...obj , owner : '6878c57708a9f85af3d6fd47'}));
    await Listing.insertMany(initData.data);
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