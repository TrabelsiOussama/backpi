const express = require('express');
const bookingtacontroller = require('./../controllers/bookingtacontroller');

const authController = require('./../controllers/authController');
var router = require("express").Router();

//router.use(authController.protect);
router.use(authController.protect);


router.get('/checkout-session/:tableId', bookingtacontroller.getCheckoutSession);




router
  .route('/')
  .get(bookingtacontroller.getAllBookings)
  .post(bookingtacontroller.createBooking);

router
  .route('/:id')
  .get(bookingtacontroller.getBooking)
  .patch(bookingtacontroller.updateBooking)
  .delete(bookingtacontroller.deleteBooking);


module.exports = router;