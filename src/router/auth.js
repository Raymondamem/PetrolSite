const router = require('express').Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcryptjs = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const connection = require('../config/db_connection');
const { registerSchema } = require('../validation/authValidation');
const ensureLoggedin = require('../middlewares/ensureLoggedin');
const current_day = (date = new Date()) => `${date.getFullYear()}-${(date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${(date.getMonth() + 1)}`}-${(date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`}`;
let error_arr = [];

router.get('/', (req, res) => {
    res.render('signin', {
        errors: req.flash("error"),
        success: req.flash("success"),
        title: `PetroSite | Signin`,
        description: 'Signin to continue using daily petrol site services'
    });
});

router.get('/dashboard', ensureLoggedin, (req, res) => {
    res.render('dashboard', {
        errors: req.flash("error"),
        success: req.flash('success'),
        user: req.user,
        title: `PetroSite | Home | ${req.user._name}`,
        description: 'A dynamic site involede in aiding daily petrol services for it\'s users and workers'
    });
});

router.get('/dailysales', ensureLoggedin, (req, res) => {
    try {
        const dailysales = `SELECT _amount, _litre FROM sales WHERE _userid = ? AND DATE(_createdat) = ?`;
        connection.query(dailysales, [req.user._id, current_day()], (err, result) => {
            if (err) {
                throw err;
            } else {
                let amountTotal = 0, litresTotal = 0;
                result.forEach(element => {
                    amountTotal += parseFloat(element._amount);
                    litresTotal += parseFloat(element._litre);
                });
                res.render('dailysales', {
                    errors: req.flash("error"),
                    user: req.user,
                    dailysales: { result, amountTotal, litresTotal },
                    title: `PetroSite | Home | dailysales | ${req.user._name}`,
                    description: 'A dynamic site involved in aiding daily petrol services for its users and workers'
                });
            }
        });
    } catch (error) {
        req.flash('error', `${error}`);
        res.redirect('/user/dailysales');
    }
});

router.get('/totalsales', ensureLoggedin, (req, res) => {
    try {
        const totalsales = `SELECT _amount, _litre, _createdat FROM sales WHERE (?) = (_userid)`;
        connection.query(totalsales, [req.user._id], (err, result) => {
            if (err) {
                throw err;
            } else {
                let amountTotal = 0, litresTotal = 0;
                result.forEach(element => {
                    amountTotal += parseFloat(element._amount);
                    litresTotal += parseFloat(element._litre);
                });
                res.render('totalsales', {
                    errors: req.flash("error"),
                    user: req.user, // never send all of user object directly to client-side, filter what you need only.
                    totalsales: { result, amountTotal, litresTotal },
                    title: `Petro site | Home | totalsales | ${req.user._name}`,
                    description: 'A dynamic site involede in aiding daily petrol services for it\'s users and workers'
                });
            }
        });
    } catch (error) {
        req.flash('error', `${error}`);
        res.redirect('/user/totalsales');
    }
});

router.get('/signup', (req, res) => {
    res.render('signup', {
        errors: req.flash("error"),
        success: req.flash("success"),
        title: `PetroSite | Signup`,
        description: 'Signup as user to use the petrol site services daily'
    });
});

router.get('/signin', (req, res) => {
    res.render('signin', {
        errors: req.flash("error"),
        success: req.flash("success"),
        title: `PetroSite | Signin`,
        description: 'Signin to continue using daily petrol site services'
    });
});

router.post('/signup', (req, res) => {
    const { error } = registerSchema.validate(req.body, { abortEarly: false });
    if (error) {
        error.details.forEach(item => {
            error_arr.push(item.message);
        });
        console.log(error_arr);
        req.flash('error', error_arr);
        res.redirect('/user/signup');
        error_arr = [];
    } else {
        try {
            const emailExist = `SELECT _email FROM user WHERE ? = _email`;
            connection.query(emailExist, [req.body.email], (err, result) => {
                if (err) {
                    req.flash('error', err);
                    res.redirect('/user/signup');
                } else if (result.length !== 0) {
                    req.flash('error', 'Email exists already!');
                    res.redirect('/user/signin');
                } else {
                    const userid = uuidv4();
                    let salt = bcryptjs.genSaltSync(10);
                    let { name, email, password } = req.body;
                    password = bcryptjs.hashSync(req.body.password, salt);
                    const sql = `INSERT INTO user (_id, _name, _email, _password) VALUES (?, ?, ?, ?)`;
                    connection.query(sql, [userid, name, email, password], (err, result) => {
                        if (err) {
                            throw err
                        } else {
                            req.flash('success', 'User successfully registered!');
                            res.redirect('/user/signin');
                        }
                    });
                }
            });
        } catch (error) {
            req.flash('error', `${error}`);
            res.redirect('/user/signup');
        }
    }
});

passport.serializeUser((user, done) => {
    done(null, user[0]._id);
});

passport.deserializeUser((id, done) => {//don't be tempted to use exceptions bro 😂 no-need just "done(err, user[0]);"
    try {
        connection.query('SELECT * FROM user WHERE _id = ?', [id], (err, user) => {
            if (err) throw err;
            done(null, user[0], null);
        });
    } catch (error) {
        done(null, false, error);
    }
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {//don't be tempted to use exceptions bro 😂 no-need
    connection.query('SELECT * FROM user WHERE _email = ?', [email], (err, user) => {
        if (err) {
            return done(err);
        } else if (!user.length) {
            return done(null, false, req.flash('error', 'Oops! invalid user'));
        } else if (!bcryptjs.compareSync(password, user[0]._password)) {
            return done(null, false, req.flash('error', 'Oops! Incorrect password.'));
        } else {
            return done(null, user, req.flash('success', `Welcome ${user[0]._email}`));
        }
    });
})
);

router.post('/signin', passport.authenticate("local", {
    successRedirect: '/user/dashboard',
    failureRedirect: '/user/signin',
    successFlash: true,
    failureFlash: true
}));

router.post('/signout', (req, res) => {
    req.session.destroy((err) => {
        return res.redirect("/user/signin");
    });
});

router.post('/dashboard', ensureLoggedin, (req, res) => {
    let { amount, litre, userid } = req.body;
    try {
        const sql = `INSERT INTO sales (_amount, _litre, _userid) VALUES (?, ?, ?)`;
        connection.query(sql, [amount, litre, userid], (err, result) => {
            if (err) {
                throw err
            } else {
                res.redirect('/user/dashboard');
            }
        });
    } catch (error) {
        req.flash('error', `${error}`);
        res.redirect('/user/dashboard');
    }
});

module.exports = router;