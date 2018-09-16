module.exports = function (sequelize, DataTypes) {
    var Person = sequelize.define("Person", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        }
    }, {
        createdAt: false,
        updatedAt: false
    });

    Person.associate = function(models) {
        Person.hasOne(models.Burger)
    }
    return Person;
}