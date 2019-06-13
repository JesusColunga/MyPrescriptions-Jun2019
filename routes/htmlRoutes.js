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
  app.get("/medicos", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("medicos", {
        msg: "Registro para Médicos",
        examples: dbExamples
      });
    });
  });

  app.get("/accesoMedicos", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("accesoMedicos", {
        msg: "Acceso para Médicos (login)",
        examples: dbExamples
      });
    });
  });

  app.get("/menuMedicos", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("menuMedicos", {
        msg: "Menú Principal para Médicos",
        examples: dbExamples
      });
    });
  });

  app.get("/listaMedicos", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("listaMedicos", {
        msg: "Consulta de Médicos disponibles",
        examples: dbExamples
      });
    });
  });

  app.get("/pacientes", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("pacientes", {
        msg: "Registro de Pacientes",
        examples: dbExamples
      });
    });
  });

  app.get("/recetas", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("recetas", {
        msg: "Registro de Recetas",
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
