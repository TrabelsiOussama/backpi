const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY1);
const Table = require('../models/table.model');
const Booking = require('../models/bookingtable.js');
const catchAsync = require('../../utils/catchAsync');
const factory = require('./handlerFactory');
exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  
    
    // 1) Get the currently booked table
    const table = await Table.findById(req.params.tableId);
    console.log({
      payment_method_types: ['card'],
      success_url: `${req.protocol}://${req.get('host')}/My-tables/?table=${
        req.params.tableId
      }&user=${req.user.id}`,
      cancel_url: `${req.protocol}://${req.get('host')}/table/${table.slug}`,
      customer_email: req.user.email,
      client_reference_id: req.params.tableId,
      line_items: [
        {
            name: `${table.number} table`,
            
            amount:table.price,
            currency: 'usd',
            quantity: 1
            
            
          
          
          
          
        }
      ]
    });
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: `${req.protocol}://${req.get('host')}/my-tables/?table=${
          req.params.tableId
        }&user=${req.user.id}&number=${table.number}`,
        cancel_url: `${req.protocol}://${req.get('host')}/table/${table.slug}`,
        customer_email: req.user.email,
        client_reference_id: req.params.tableId,
        line_items: [
          {
            name: `${table.number} table`,
            
            amount:table.price *10,
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
        const { table, user} = req.query;
      
        if (!table && !user ) return next();
        await Booking.create({ table, user});
      
        res.redirect(req.originalUrl.split('?')[0]);
      });
      
      exports.createBooking = factory.createOne(Booking);
      exports.getBooking = factory.getOne(Booking);
      exports.getAllBookings = factory.getAll(Booking);
      exports.updateBooking = factory.updateOne(Booking);
      exports.deleteBooking = factory.deleteOne(Booking);
      