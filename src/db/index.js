const moongose = require("moongoose");

require("dotenv").config();
const dbUri = process.env.DB_URI;

const db = moongose.connect(dbUri, {
  userUnifieldTopology: true,
  userCreateIndex: true,
  userNewUrlParser: true,
  userFindAndModify: false,
});

process.on("SIGINT", async () => {
  moongose.connection.close(() => {
    console.log("DB was discon  nected");
    process.exit(1);
  });
});

module.exports = db;
