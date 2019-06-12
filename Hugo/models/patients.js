module.exports = function(sequelize, DataTypes) {
  var Patients = sequelize.define("Patients", {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    LastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    PhoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    DateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Patients.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Patients.belongsTo(models.Doctors, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Patients;
};
