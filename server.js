const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

const app = express();
const router = require("../backprojet/app/routes/userRoutes");
const dotenv = require('dotenv');



var corsOptions = {
  origin: "http://localhost:8081"
};
dotenv.config({ path: './config.env' });
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// require("./app/routes/meal.routes")(app);
const quizzRouter = require("./app/routes/quizz.routes");
const userRouter = require("./app/routes/userRoutes");
const mealRouter = require("./app/routes/meal.routes");
const tableRouter = require("./app/routes/table.routes");
const reviewRouter = require("./app/routes/reviewRoutes");
const bookingRouter = require("./app/routes/bookingRoutes");
const bookingtaRoutes = require("./app/routes/bookingtaRoutes");
app.use("/api/users", userRouter);
app.use("/api/meals", mealRouter);
app.use("/api/tables", tableRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/bookings", bookingRouter); 
app.use("/api/quizz", quizzRouter);
app.use("/api/bookingta", bookingtaRoutes);

userRouter.stack.forEach(function (r) {
  if (r.route && r.route.path) {
    console.log(r.route.path)
  }
})
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
