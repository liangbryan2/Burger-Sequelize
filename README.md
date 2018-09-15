# Burger Devourer
Node Express Handlebars Burger App

![index](/public/assets/img/index.png)

## Getting Started
[Burgers](https://burgereater2.herokuapp.com/)

This Burger indulging website is built with
* [Node.js](https://nodejs.org/en/) 
* [express](https://www.npmjs.com/package/express)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [body-parser](https://www.npmjs.com/package/body-parser)
* [mysql](https://www.npmjs.com/package/mysql)
### As well as your usual website technologies:
* HTML
* CSS / [UI Kit](https://getuikit.com/)
* JavaScript / [jQuery](https://jquery.com/)

## Using the Website
Using Burger Devourer is really straight forward.
* Type in the name of the burger you want to eat. 
Then click on the Add button.
* It will show up in the Not Eaten portion of the page. 
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
        <button class="eat uk-button uk-button-danger" data-id="{{this.id}}">Eat</button>
        </p>
    {{/unless}}
{{/each}}
```
### ORM
Learning about ORM was another goal of this project. ORM allows us to query and manipulate data from a database. There are many prebuilt ORM tools already created, but for this project, I created my own.

This is a little snippet of the ORM I created. This code allows you to select everything from the database and what you do with the data is up to you.
```js
var orm = {
    selectAll: function (table, cb) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, result) {
            if (err) {
                throw err;
            }
            cb(result);
        });
    }
};
```
I chose to display all the data onto the page with these lines of code.
```js
router.get("/", function (req, res) {
    burger.selectAll(function (data) {
        var burgerObj = {
            burgers: data
        };
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
This is also the first time I used JawsDB for deployment on Heroku. Now everything is tied together. We have a backend server with database, and a front end to display the data.

## Author
[Bryan Liang](https://github.com/liangbryan2)