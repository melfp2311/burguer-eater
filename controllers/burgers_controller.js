var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

//Routes
//GET route
router.get("/", function(req, res){
    burger.selectAll(function(data){
        var hbObjt = {
            burgers: data
        };
        res.render("index", hbObjt);
    });
});

//POST route
router.post("/api/burgers", function(req, res){
    console.log(req.body);
    burger.insertOne([
        "burger_name", "devoured"
    ], [
        req.body.burger_name, req.body.devoured
    ], function(result){
        res.json({ id: result.insertId})
    });
});

//PUT route
router.put("/api/burgers/:id", function(req, res){
    var condition = "id = " + req.params.id;
    burger.updateOne({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows === 0) {
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//DELETE route
router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
    console.log("condition", condition);
  
    burger.delete(condition, function(result) {
      console.log(result);
              // If no rows were changed, then the ID must not exist, so 404
      if (result.affectedRows == 0) {
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });

module.exports = router;