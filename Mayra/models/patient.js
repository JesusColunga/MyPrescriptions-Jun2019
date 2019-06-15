// models/Patient.js

module.exports = function(sequelize, DataTypes) {
  var Patient = sequelize.define("Patient", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: {
          args: [1],
          msg: "No name provided"
        }
      }
    },
    birthdate: DataTypes.DATEONLY,
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: {
          args: [1],
          msg: "No gender provided"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      isEmail: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      isNumeric: true
    }
  });

  Patient.associate = function(models) {
    Patient.hasMany(models.Prescription, {
      onDelete: "cascade"
    });
  };

  Patient.associate = function(models) {
    Patient.belongsTo(models.Doctor, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Patient;
};
