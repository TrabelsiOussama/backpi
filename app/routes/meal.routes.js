
  const meals = require("../controllers/meal.controller.js");

  var router = require("express").Router();

  // Create a new meal
  router.post("/", meals.create);

  // Retrieve all meals
  router.get("/", meals.findAll);

  // Retrieve all published meals
  router.get("/published", meals.findAllPublished);

  // Retrieve a single meal with id
  router.get("/:id", meals.findOne);

  // Update a meal with id
  router.put("/:id", meals.update);

  // Delete a meal with id
  router.delete("/:id", meals.delete);

  // Create a new meal
  router.delete("/", meals.deleteAll);


  module.exports = router;