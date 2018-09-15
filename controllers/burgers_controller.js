var express = require("express");

var router = express.Router();

var db = require('../models');

router.get("/", function (req, res) {
    db.Burger.findAll({})
        .then(function (dbBurger) {
            res.render("index", dbBurger);
        })
    // burger.selectAll(function (data) {
    //     var burgerObj = {
    //         burgers: data
    //     };
    //     res.render("index", burgerObj);
    // })
})

router.post("/api/burgers", function (req, res) {
    // burger.insertOne(["burger_name"], [req.body.name], function (result) {
    //     res.json({
    //         id: result.insertId
    //     })
    // })
})

router.put("/api/burgers/:id", function (req, res) {
    var condition = "id = " + req.params.id;

    // burger.updateOne({
    //     devoured: req.body.devoured
    // }, condition, function (result) {
    //     if (result.changedRows == 0) {
    //         return res.status(404).end();
    //     } else {
    //         res.status(200).end();
    //     }
    // })
})

module.exports = router;