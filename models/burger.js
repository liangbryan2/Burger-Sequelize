module.exports = function (sequelize, DataTypes) {
    var Burger = sequelize.define("Burger", {
        burger_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 160]
            }
        },
        devoured: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        createdAt: false,
        updatedAt: false
    });

    Burger.associate = function (models) {
        Burger.belongsTo(models.Person, {
            foreignKey: {
                allowNull: true
            }
        })
    }
    return Burger;
}