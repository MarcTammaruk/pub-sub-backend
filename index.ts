import { Application } from "express";
const pub = require("./routes/publish");
const sub = require("./routes/subscriber");
const express = require("express");
const app: Application = express();
const bodyParser = require("body-parser");

const hostname = "127.0.0.1";
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/pub", pub);

app.use("/sub", sub);

// const server = http.createServer((req:any, res:any) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World');
//   });

app.listen(port, "0.0.0.0", () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
