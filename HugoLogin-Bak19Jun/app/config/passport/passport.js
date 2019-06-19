//load bcrypt
//var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport, doctor) {

    var Doctor = doctor;
    var LocalStrategy = require('passport-local').Strategy;


    passport.serializeUser(function(doctor, done) {
        done(null, doctor.id);
    });


    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        Doctor.findById(id).then(function(doctor) {
            if (doctor) {
                done(null, doctor.get());
            } else {
                done(doctor.errors, null);
            }
        });

    });


    passport.use('local-signup', new LocalStrategy(

        {
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },

        function(req, email, password, done) {
            console.log("Paso");
            console.log(email);
            console.log(password);
            //var generateHash = function(password) {
            //  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
            //};

            Doctor.findOne({ where: { email: email } }).then(function(doctor) {

                if (doctor) {
                    return done(null, false, { message: 'That email is already taken' });
                } else {
                    //var userPassword = generateHash(password);
                    var userPassword = password;
                    var data = {
                        email: email,
                        password: userPassword,
                        firstname: req.body.firstname,
                        lastname: req.body.lastname,
                        phone: req.body.phone,
                        username: req.body.username,
                        license: req.body.license
                    };
                    console.log("paso");

                    Doctor.create(data).then(function(newUser, created) {
                        if (!newUser) {
                            return done(null, false);
                        }

                        if (newUser) {
                            return done(null, newUser);

                        }


                    });
                }


            });



        }



    ));

    //LOCAL SIGNIN
    passport.use('local-signin', new LocalStrategy(

        {

            // by default, local strategy uses username and password, we will override with email
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback
        },



        function(req, email, password, done) {
            console.log("adentro");
            console.log(email);

            console.log(password);

            var Doctor = doctor;

            //var isValidPassword = function(userpass, password) {
            //  return bCrypt.compareSync(password, userpass);
            //}

            Doctor.findOne({ where: { email: email, password: password } }).then(function(doctor) {

                //    if (!doctor) {
                //      return done(null, false, { message: 'Email does not exist' });
                //}

                // if (!isValidPassword(doctor.password, password)) {

                //   return done(null, false, { message: 'Incorrect password.' });

                //}

                var userinfo = doctor.get();

                return done(null, userinfo);

            }).catch(function(err) {

                console.log("Error:", err);

                return done(null, false, { message: 'Something went wrong with your Signin' });


            });

        }));

}