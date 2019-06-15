// models/prescription.js

module.exports = function(sequelize, DataTypes) {
  var Prescription = sequelize.define(
    "Prescription",
    {
      idDoctor: {
        type: DataTypes.INTEGER
      },
      idPatient: {
        type: DataTypes.INTEGER
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: false,
          len: {
            args: [1, 10],
            msg: "No weight provided"
          }
        }
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        isNumeric: true
      },
      pulse: {
        allowNull: false,
        type: DataTypes.STRING
      },
      prescription: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: false,
          len: {
            args: [1],
            msg: "No prescription"
          }
        }
      },
      observations: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: false,
          len: {
            args: [1],
            msg: "No observations"
          }
        }
      }
    },
    {
      tableName: "Prescriptions"
    }
  );

  Prescription.associate = function(models) {
    Prescription.belongsTo(models.Patient, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Prescription;
};
