const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync(
  path.join(__dirname, "..", "..", "model", "contacts.json")
);
const db = low(adapter);

db.defaults({ contacts: [] }).write();
console.log(path.join(__dirname, "..", "..", "model", "contacts.json"));
// console.log(db);

exports.modules = db;
