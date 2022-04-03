const tables = require("../controllers/table.controller.js");

var router = require("express").Router();

// Create a new Table
router.post("/", tables.create);

// Retrieve all Tables
router.get("/", tables.findAll);

// Retrieve all booked Tables
router.get("/booked", tables.findAllPublished);

// Retrieve a single Table with id
router.get("/:id", tables.findOne);

// Update a Table with id
router.put("/:id", tables.update);

// Delete a Table with id
router.delete("/:id", tables.delete);

//Delete all tables
router.delete("/", tables.deleteAll);

module.exports = router;
