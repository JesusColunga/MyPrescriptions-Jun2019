// models/medico.js

module.exports = function(sequelize, DataTypes) {
  var Medico = sequelize.define("Medico", {
    nombre: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING,
    usuario: DataTypes.STRING,
    contrasena: DataTypes.STRING,
    cedula: DataTypes.STRING
  });

  Medico.associate = function(models) {
    Medico.hasMany(models.Paciente, {
      onDelete: "cascade"
    });
  };

  return Medico;
};
