module.exports = function(sequelize, DataTypes) {
    var Strains = sequelize.define("Strains", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      race: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Sativa"
      },
    });

    Strains.associate = function(models) {
      Strains.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Strains;
  };
  