const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  meal: {
    type: mongoose.Schema.ObjectId,
    ref: 'Meal',
    required: [true, 'Booking must belong to a Meal!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  },
  price: {
    type: Number,
    require: [true, 'Booking must have a price.']
  },
  paid: {
    type: Boolean,
    default: true
  }
});
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'meal',
    select: 'name'
  });
  next();
});
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'table',
    select: 'name'
  });
  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
