// routes/htmlRoutes.js

var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(
      dbExample
    ) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //------------------------------------------------------
  // Doctors
  //------------------------------------------------------
  app.get("/doctors", function(req, res) {
    db.Doctor.findAll({}).then(function(dbRecords) {
      res.render("doctors", {
        msg: "Doctors Register",
        recs: dbRecords
      });
    });
  });

  app.get("/doctorsLogin", function(req, res) {
    db.Doctor.findAll({}).then(function(dbRecords) {
      res.render("doctorsLogin", {
        msg: "Doctors Login",
        recs: dbRecords
      });
    });
  });

  app.get("/doctorsMenu", function(req, res) {
    db.Patient.findAll({}).then(function(dbRecords) {
      res.render("doctorsMenu", {
        msg: "Doctors Main Menu",
        recs: dbRecords
      });
    });
  });

  app.get("/doctorsList", function(req, res) {
    db.Doctor.findAll({}).then(function(dbRecords) {
      res.render("doctorsList", {
        msg: "Available Doctors",
        recs: dbRecords
      });
    });
  });

  //-----------------------------------------

  app.get("/patients", function(req, res) {
    db.Patient.findAll({}).then(function(dbRecords) {
      res.render("patients", {
        msg: "Patients Register",
        recs: dbRecords
      });
    });
  });

  app.get("/patients/:id", function(req, res) {
    db.Patient.findOne({ where: { id: req.params.id } }).then(function(dbRecords) {
      res.render("patients", {
        msg: "Patients Register",
        recs: dbRecords
      });
    });
  });

  //-----------------------------------------

  app.get("/prescriptions", function(req, res) {
    db.Prescription.findAll({}).then(function(dbRecords) {
      res.render("prescriptions", {
        msg: "Prescriptions Register",
        recs: dbRecords
      });
    });
  });

  //-----------------------------------------

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
