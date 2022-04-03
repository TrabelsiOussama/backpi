const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  table: {
    type: mongoose.Schema.ObjectId,
    ref: 'Table',
    required: [true, 'Booking must belong to a table!']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a User!']
  }
  
});
bookingSchema.pre(/^find/, function (next) {
  this.populate('user').populate({
    path: 'table',
    select: 'name'
  });
  next();
});


const Bookingta = mongoose.model('Bookingta', bookingSchema);

module.exports = Bookingta;
