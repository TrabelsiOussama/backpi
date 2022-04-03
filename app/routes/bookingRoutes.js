const express = require('express');
const bookingController = require('./../controllers/bookingController');

const authController = require('./../controllers/authController');
var router = require("express").Router();

//router.use(authController.protect);
router.use(authController.protect);


router.get('/checkout-session/:mealId', bookingController.getCheckoutSession);



router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);


module.exports = router;