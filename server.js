const express = require("express");
require("dotenv").config();
const app = express();
const routers = require("./routes");
const errorHandler = require("./middlewares/ErrorHandler");
const dbConnect = require("./utils/database");
const cors = require("cors");

const options = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(options));

app.use(express.json());
app.use("/api", routers);
app.use(errorHandler);
dbConnect();

const port = process.env.PORT || 5050;

app.listen(port, console.log(`Server listening on port ${port}`));
