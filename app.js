const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const Listing = require('./models/listings');
const ejsMate = require('ejs-mate');
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');

main()
.then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/easyStay');
}
// app.get('/listings', async (req, res) => {
//    const lists = await Listing.find({});
//     res.render('listings.ejs',{lists});
// });
app.get('/',async (req, res) => {
  const lists = await Listing.find({});
   res.render('home.ejs',{lists});
    });
app.get('/listings/new', (req, res) => {
    res.render('new.ejs');
});
app.get('/listings/:id/edit', async (req, res) => {
    const { id } = req.params;
    const list = await Listing.findById(id);
    res.render('edit.ejs', { list });
});
app.get('/listings/:id', async (req, res) => {
        const { id } = req.params;
        const list = await Listing.findById(id);
        res.render('show2.ejs', { list });
});

app.post('/listings', async (req, res) => {
    const { title,image, price, location, description,contact,country } = req.body;
    const listing = new Listing({ title, image,price, location, description ,contact,country});
    await listing.save();
    res.redirect('/');
});
app.put('/listings/:id', async (req, res) => {
    const { id } = req.params;
    const { title,image, price, location, description,contact,country } = req.body;
    const list = await Listing.findByIdAndUpdate(id, { title,image, price, location, description,contact,country });
    await list.save();
    res.redirect(`/listings/${id}`);
});
app.delete('/listings/:id', async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect('/');
});