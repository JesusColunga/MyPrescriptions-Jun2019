module.exports = function(sequelize, DataTypes) {
  var Prescriptions = sequelize.define("Presciptions", {
    Prescription: {
      type: DataTypes.TEXT,
      allowNull: false,
      
    },
    Observations: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    }
  });

  Prescriptions.associate = function(models) {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Prescriptions.belongsTo(models.Doctors, {
      foreignKey: {
        allowNull: false
      }
    });
    Prescriptions.belongsTo(models.Patients, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Prescriptions;
};
