// models/receta.js

module.exports = function(sequelize, DataTypes) {
  var Receta = sequelize.define(
    "Receta",
    {
      idMedico: DataTypes.INTEGER,
      idPaciente: DataTypes.INTEGER,
      peso: DataTypes.INTEGER,
      estatura: DataTypes.INTEGER,
      pulso: DataTypes.STRING,
      prescripcion: DataTypes.TEXT,
      expediente: DataTypes.TEXT
    },
    {
      tableName: "Recetas"
    }
  );

  Receta.associate = function(models) {
    Receta.belongsTo(models.Paciente, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Receta;
};
