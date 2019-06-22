// models/doctor.js

module.exports = function(sequelize, DataTypes) {
  var Doctor = sequelize.define("Doctor", {
    firstname: {
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

    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: {
          args: [1],
          msg: "No last name provided"
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
    },
    username: {
      type: DataTypes.STRING,
      isAlphanumeric: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: {
          args: [5],
          msg: "At least 5 characters"
        }
      }
    },
    specialty: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: {
          args: [2],
          msg: "At least 2 characters"
        }
      }
    },
    license: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: false,
        len: {
          args: [1],
          msg: "No license provided"
        }
      }
    }
  });

  Doctor.associate = function(models) {
    Doctor.hasMany(models.Patient, {
      onDelete: "cascade"
    });
  };

  return Doctor;
};
