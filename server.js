const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDb = require("./config/connectDb");
const path=require('path');
// config dot env file
dotenv.config();

//databse call
connectDb();

//rest object
const app = express();

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//routes
//user routes
app.use("/api/v1/users", require("./routes/userRoute"));
//transections routes
app.use("/api/v1/transections", require("./routes/transectionRoutes"));

app.use(express.static(path.join(__dirname,'./client/build')))


app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
})
//port
const PORT = 8080 || process.env.PORT;

//listen server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
//mongoose.connect('mongodb+srv://ankushukey4:XGDU1kI0GzwKHC4u@blog.lmgy47u.mongodb.net/?retryWrites=true&w=majority');
//mongodb+srv://ankushukey4:<password>@cluster0.27pmyww.mongodb.net/?retryWrites=true&w=majority