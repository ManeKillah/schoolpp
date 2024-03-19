// import { connect } from "http2";
// "use client";
const mysql = require("mysql");

export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "schoolpp-db",
});

db.connect((err) => {
  if (err) {
    console.log("error connecting to the database");
  } else {
    console.log("conection to MYSQL");
  }
});
