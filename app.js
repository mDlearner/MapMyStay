if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const path = require('path');
const listingsRoutes = require('./routes/listings');
const reviewRoutes = require('./routes/review');
const userRoutes = require('./routes/user');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
const ExpressError = require('./utils/ExpressError');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const dbURL = process.env.ATLAS_URL;



const store = MongoStore.create({
  mongoUrl: dbURL,
  touchAfter: 24 * 3600, // time period in seconds
  crypto: {
    secret: process.env.SECRET ,
  }
});

store.on('error', function(e) {
  console.log('Session store error', e);
});

const sessionConfig = {
      store: store,
      secret : process.env.SECRET,
      resave : false,
      saveUninitialized : true,
     cookie : {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 ,// 1 day
        expire : new Date(Date.now() + 1000 * 60 * 60 * 24) // 1 day
      },
};



app.use(session(sessionConfig));
const flash = require('connect-flash');
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currentUser = req.user;
  next();
});

main()
.then(() => {
  console.log('MongoDB connected');
  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect(dbURL);
}
app.use('/listings', listingsRoutes);
app.use('/listings/:id/review', reviewRoutes);
app.use('/user', userRoutes);
app.all('*', (req, res, next) => {
    next(new ExpressError(404,'Page Not Found' ));
});
app.use((err, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = err;
  res.status(status).send(message);
});