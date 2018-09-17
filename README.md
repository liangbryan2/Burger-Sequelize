# Burger Devourer
Node Express Handlebars Burger App

![index](https://raw.githubusercontent.com/liangbryan2/Burger-Sequelize/master/public/assets/img/eaten.PNG)

## Getting Started
[Burgers](https://sequelizeburgers2.herokuapp.com/)

This Burger indulging website is built with
* [Node.js](https://nodejs.org/en/) 
* [express](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [mysql2](https://www.npmjs.com/package/mysql2)
* [sequelize](https://www.npmjs.com/package/sequelize)
### As well as your usual website technologies:
* HTML
* CSS / [UI Kit](https://getuikit.com/)
* JavaScript / [jQuery](https://jquery.com/)

## Using the Website
Using Burger Devourer is really straight forward.
* Type in the name of the burger you want to eat. 
Then click on the Add button.
* It will show up in the Not Eaten portion of the page. 
* Enter the name of the person eating the burger.
* Click EAT next to the burger you want to eat. 
* It will then show up in the Devourerd section of the page.

## Creating Burger Devourer
### Handlebars
This website was created with the goal of learning how to use use express-handlebars. 
Handlebars allows us to serve up HTML code to the client more easily than sending an entirely built out HTML page.

This is an example of how I used handlebars. The syntax requires us to use two curly braces {{     }}. We can now access each item within the variable burgers and display what we need. Previously, we had to create all the logic in a separate JavaScript file to create a new div, then append that div to the page.
```handlebars
{{#each burgers}}
    {{#unless this.devoured}}
        <p>
            {{this.burger_name}}
            <input id="person" class="uk-input uk-form-width-small uk-form-small" type="text"
            placeholder="Who's eating?">
            <button class="eat uk-button uk-button-danger" data-id="{{this.id}}">Eat</button>
        </p>
    {{/unless}}
{{/each}}
```
### Sequelize
We are using Sequelize instead of creating our own ORM. Sequelize has a lot of prebuilt functions that allow us to access data from a MySql database. I create a Burger model here using Sequelize so that this Burger model can call on Sequelize functions.
```js
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
```
findAll() is one of the Sequelize functions. It allows me to display all burgers onto the page with the following lines of code.
```js
router.get("/", function (req, res) {
    db.Burger.findAll({
            include: [db.Person]
        })
        .then(function (data) {
            var burgerObj = {
                burgers: data
            }
            res.render("index", burgerObj);
        })
})
```
## Other Learning Points
In order to have everything more modular, we separated all code into their own folders and files. In the past, we only had 3 files. The HTML, the JavaScript, and the CSS. Now we have files within folders within folders within folders. This requires us to require (haha...) the code from the other files. We have a lot of files that end in or start with this.
```js
module.exports = burger;
var burger = require("../burger.js")
```
This is also the first time I used JawsDB for deployment on Heroku. This section in the config file tells the server to use the JawsDB information.
```js
"production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
}
```
Now everything is tied together. We have a backend server with database, and a front end to display the data.

## Author
[Bryan Liang](https://github.com/liangbryan2)
