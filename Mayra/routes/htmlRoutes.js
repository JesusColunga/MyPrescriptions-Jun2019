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
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  //-----------------------------------------
  app.get("/doctors", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("doctors", {
        msg: "Doctors Register",
        examples: dbExamples
      });
    });
  });

  app.get("/doctorsLogin", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("doctorsLogin", {
        msg: "Doctors' Login",
        examples: dbExamples
      });
    });
  });

  app.get("/doctorsMenu", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("doctorsMenu", {
        msg: "Doctors' Main Menu",
        examples: dbExamples
      });
    });
  });

  app.get("/doctorsList", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("doctorsList", {
        msg: "Available Doctors",
        examples: dbExamples
      });
    });
  });

  app.get("/patients", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("patients", {
        msg: "Patients Register",
        examples: dbExamples
      });
    });
  });

  app.get("/prescriptions", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("prescription", {
        msg: "Prescriptions Register",
        examples: dbExamples
      });
    });
  });

  //-----------------------------------------

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
