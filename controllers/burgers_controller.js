var express = require("express");

var router = express.Router();

var db = require('../models');

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

router.post("/api/burgers", function (req, res) {
    db.Burger.create({
        burger_name: req.body.name
    }).then(function (result) {
        res.json(result);
    })
})

router.put("/api/burgers/:id", function (req, res) {
    db.Burger.update(
        req.body, {
            where: {
                id: req.params.id
            }
        }
    ).then(function (result) {
        res.json(result);
    })
})

router.put("/api/people", function (req, res) {
    db.Person.create({
        name: req.body.name
    }).then(function(result) {
        res.json(result);
    })
})

module.exports = router;