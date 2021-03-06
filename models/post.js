module.exports = function(sequelize, DataTypes) {
    var Post = sequelize.define("Post", {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      strain: {
        type: DataTypes.STRING,
        defaultValue: "I forgot!"
      },
      entry: {
        type: DataTypes.TEXT
      },
      effects: {
          type: DataTypes.TEXT
      }
    });

    Post.associate = function(models) {
      Post.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Post;
  };
  