// models/paciente.js

module.exports = function(sequelize, DataTypes) {
  var Paciente = sequelize.define("Paciente", {
    nombre: DataTypes.STRING,
    fechaNacim: DataTypes.DATEONLY,
    sexo: DataTypes.STRING,
    correo: DataTypes.STRING,
    telefono: DataTypes.STRING
  });

  Paciente.associate = function(models) {
    Paciente.hasMany(models.Receta, {
      onDelete: "cascade"
    });
  };

  Paciente.associate = function(models) {
    Paciente.belongsTo(models.Medico, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Paciente;
};
