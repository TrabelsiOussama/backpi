const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Meal = require('../models/meal.model');
const Booking = require('../models/bookingModel.js');
const catchAsync = require('../../utils/catchAsync');
const factory = require('./handlerFactory');
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  
    
    // 1) Get the currently booked meal
    const meal = await Meal.findById(req.params.mealId);
    console.log({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/my-meals/?meal=${
        req.params.mealId
      }&user=${req.user.id}&price=${meal.price}`,
      cancel_url: `${req.protocol}://${req.get('host')}/meal/${meal.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.mealId,
      line_items: [
        {
          name: `${meal.title} Meal`,
          description: meal.description,
          
          amount: meal.price ,
          currency: 'usd',
          quantity: 1
        }
      ]
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/my-meals/?meal=${
          req.params.mealId
        }&user=${req.user.id}&price=${meal.price}`,
        cancel_url: `${req.protocol}://${req.get('host')}/meal/${meal.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.mealId,
        line_items: [
          {
            name: `${meal.title} Meal`,
            description: meal.description,
            
            amount: meal.price * 100,
            currency: 'usd',
            quantity: 1
          }
        ]
      });
    
      // 3) Create session as response
      res.status(200).json({
        status: 'success',
        session
      });
    });
    exports.createBookingCheckout = catchAsync(async (req, res, next) => {
        // This is only TEMPORARY, because it's UNSECURE: everyone can make bookings without paying
        const { meal, user, price } = req.query;
      
        if (!meal && !user && !price) return next();
        await Booking.create({ meal, user, price });
      
        res.redirect(req.originalUrl.split('?')[0]);
      });
      
      exports.createBooking = factory.createOne(Booking);
      exports.getBooking = factory.getOne(Booking);
      exports.getAllBookings = factory.getAll(Booking);
      exports.updateBooking = factory.updateOne(Booking);
      exports.deleteBooking = factory.deleteOne(Booking);
      