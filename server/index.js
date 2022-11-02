const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "containers-us-west-107.railway.app",
  port: "7188",
  user: "root",
  password: "XcjZhVuq7OkhBY60wSZn",
  database: "railway",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const sqlLoginCheck =
    "SELECT * FROM users_mod WHERE email = ? AND password = ?";

  db.query(sqlLoginCheck, [email, password], (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (result.length > 0) {
      res.send(result);
    } else {
      res.send({ message: "Wrong email/password combination!" });
    }
    console.log(err, result);
  });
});

// app.put("/api/update", (req, res) => {
//   const id = req.body.id;
//   const name = req.body.userName;
//   const pass = req.body.password;
//   const email = req.body.email;
//   const info = req.body.userInfo;

//   const sqlUpdate = "UPDATE users SET userName = ?, password = ?, email = ?, userInfo = ? WHERE id = ?";

//     db.query(sqlUpdate,[name, pass, email, info, id] , (err, result) => {
//       if (err) console.log(err);
//     })
// });

app.post("/api/insert", (req, res) => {
  const userName = req.body.userName;
  const password = req.body.password;
  const email = req.body.email;

  const sqlInsert =
    "INSERT INTO users_mod (username,email,password,userinfo) VALUES (?,?,?,'Enter info here!')";
  db.query(sqlInsert, [userName, email, password], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("alpertest");
  console.log(req);
  console.log(res);
});

app.listen(process.env.PORT || 3001, () => {
  console.log("bruh");
});
