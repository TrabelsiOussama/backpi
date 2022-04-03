const mongoose = require('mongoose');
const slugify =require('slugify');

const mealSchema = new mongoose.Schema(
  {
    title:{
      type: String
    },
    description:{
      type: String
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: val => Math.round(val * 10) / 10 // 4.666666, 46.6666, 47, 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0
    },
    price: {
      type: Number,
      
    },
    

  }
);
mealSchema.index({ price: 1, ratingsAverage: -1 });

mealSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'meal',
  localField: '_id'
});
/*mealSchema.pre('save', function(next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});*/
mealSchema.pre(/^find/, function(next) {
  this.find({ secretMeal: { $ne: true } });

  this.start = Date.now();
  next();
});
mealSchema.post(/^find/, function(docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});
const Meal = mongoose.model('Meal', mealSchema);
module.exports = Meal;





























/*module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean
      
    },
    
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Meal = mongoose.model("meal", schema);
  return Meal;
};*/
