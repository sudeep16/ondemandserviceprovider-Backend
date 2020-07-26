const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/users");
const serviceAdsRouter = require("./routes/serviceAds");
const feedbacksRouter = require("./routes/feedbacks");
const hiredListRouter = require("./routes/hiredList");
const wishlistRouter = require("./routes/wishlist");
const pendingListRouter = require("./routes/pendingList");
const auth = require("./auth");

const app = express();
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

//routes
app.use("/users", userRouter);
app.use("/serviceAds", auth.verifyUser, serviceAdsRouter);
app.use("/feedbacks", auth.verifyUser, feedbacksRouter);
app.use("/hiredList", auth.verifyUser, hiredListRouter);
app.use("/wishlist", auth.verifyUser, wishlistRouter);
app.use("/pendingList", auth.verifyUser, pendingListRouter);

//database config
mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then((db) => {
    console.log("Successfully connected to MongoDB server");
}, (err) => console.log(err));

//error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ status: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`App is running at localhost:${process.env.PORT}`);
});



