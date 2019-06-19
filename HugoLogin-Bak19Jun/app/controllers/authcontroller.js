var exports = module.exports = {}


exports.doctors = function(req, res) {

    res.render('doctors');

}

exports.doctorsLogin = function(req, res) {

    res.render('doctorsLogin');

}

//exports.dashboard = function(req, res) {

//  res.render('dashboard');

//}

exports.logout = function(req, res) {

    req.session.destroy(function(err) {
        res.redirect('/doctorsLogin');
    });

}