const express = require('express');
const authRoute = require('./router/auth');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const configViewEngine = require('./config/viewEngine');
const passport = require('passport');
const app = express();
//use cookie parser
app.use(cookieParser('secret'));
//config session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
  }
}));
// flash use
app.use(flash());
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configViewEngine(app);

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use('/user', authRoute);
app.get('/', (req, res) => {
  res.render('signin', {
    errors: req.flash("error"),
    success: req.flash("success"),
    title: `PetroSite | Signin`,
    description: 'Signin to continue using daily petrol site services'
  });
});//'localhost:4000/' not 'localhost:4000/user' 😂

app.get('*', (req, res) => {
  res.render("_404", {
    errors: req.flash("error"),
    success: req.flash("success"),
    title: `PetroSite | 404 Page Not Found`,
    description: '404 Page Not Found'
  })
})
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server started, http://localhost:${port}`));
