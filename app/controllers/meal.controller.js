const db = require("../models");

const Meal = require('./../models/meal.model');
// Create and Save a new meal
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a meal
  const meal = new Meal({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save meal in the database
  meal
    .save(meal)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the meal."
      });
    });
};

// Retrieve all meals from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Meal.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meals."
      });
    });
};

// Find a single meal with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Meal.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found meal with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving meal with id=" + id });
    });
};

// Update a meal by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Meal.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update meal with id=${id}. Maybe meal was not found!`
        });
      } else res.send({ message: "meal was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating meal with id=" + id
      });
    });
};

// Delete a meal with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Meal.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete meal with id=${id}. Maybe meal was not found!`
        });
      } else {
        res.send({
          message: "meal was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete meal with id=" + id
      });
    });
};

// Delete all meals from the database.
exports.deleteAll = (req, res) => {
  Meal.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} meals were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all meals."
      });
    });
};

// Find all published meals
exports.findAllPublished = (req, res) => {
  Meal.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving meals."
      });
    });
};
