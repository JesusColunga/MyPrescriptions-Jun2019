var authController = require('../controllers/authcontroller.js');

module.exports = function(app, passport) {

    app.get('/doctors', authController.doctors);


    app.get('/doctorsLogin', authController.doctorsLogin);


    app.post('/doctors', passport.authenticate('local-signup', {
        successRedirect: '/dashboard',
        failureRedirect: '/doctorsLogin'
    }));


    //app.get('/dashboard', isLoggedIn, authController.dashboard);


    app.get('/logout', authController.logout);


    app.post('/doctorsLogin', passport.authenticate('local-signin', {
        successRedirect: '/dashboard',
        failureRedirect: '/doctorsLogin'
    }));


    function isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            console.log("Prueba");

            console.log(req.user.email);

            return next();
        } else {
            res.redirect('/doctorsLogin');
        }
    }


}