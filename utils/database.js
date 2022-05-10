const mongoose = require("mongoose");

const dbConnect = async () => {
  mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("DB Connected..");
  });
};

module.exports = dbConnect;
