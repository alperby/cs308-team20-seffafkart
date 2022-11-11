const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");

const db = mysql.createPool({
  host: "containers-us-west-112.railway.app",
  port: "6729",
  user: "root",
  password: "lSujSaxLjNaXMvnoeixR",
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

app.delete("/api/delete/:userName", (req, res) => {
  const name = req.params.userName;

  const sqlDelete = "DELETE FROM users_mod WHERE username = ?";

  db.query(sqlDelete, name, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/updateusername", (req, res) => {
  const id = req.body.id;
  const userName = req.body.userName;

  const sqlUpdate = "UPDATE users_mod SET username = ? WHERE id = ?";

  db.query(sqlUpdate, [userName, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/updatepassword", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;

  const sqlUpdate = "UPDATE users_mod SET password = ? WHERE id = ?";

  db.query(sqlUpdate, [password, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/updateemail", (req, res) => {
  const id = req.body.id;
  const email = req.body.email;

  const sqlUpdate = "UPDATE users_mod SET email = ? WHERE id = ?";

  db.query(sqlUpdate, [email, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/api/updateuserinfo", (req, res) => {
  const id = req.body.id;
  const userinfo = req.body.userInfo;

  const sqlUpdate = "UPDATE users_mod SET userinfo = ? WHERE id = ?";

  db.query(sqlUpdate, [userinfo, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

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

app.post("/api/insert_team", (req, res) => {
  const teamName = req.body.teamName;
  const sqlInsert = "INSERT INTO football_team (name) VALUES (?)";
  db.query(sqlInsert, [teamName], (err, result) => {
    console.log(err);
    console.log(result);
    res.send(result);
  });
});

app.post("/api/team_data", (req, res) => {
  const sqlGetTeam = "SELECT name FROM football_team";

  db.query(sqlGetTeam, (err, result) => {
    if (err) {
      res.send({ err: err });
    }
    if (r) {
      res.send(result);
    }
    console.log(err, result);
  });
});

app.listen(process.env.PORT || 3001, () => {
  console.log("bruh");
});
