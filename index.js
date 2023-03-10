const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
// app.use(express.static(__dirname + "/public"));
app.use("/public", express.static("public"));

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', "*");
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

var fileFilter = function (req, file, cb) {
  if (!file) {
    cb(null, false);
    return;
  }
  cb(null, true); //commit

};

// multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    console.log(`${file} in this step`);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ fileFilter, storage });
app.set("view engine", "ejs");

app.get("/upload", (req, res) => {
  
  res.render("public");
});
// Login User
app.post("/upload", upload.single("image"), (req, res) => {
  // console.log(req.file + "2 step")
  let image_url;
  if (req.file) {
    image_url = req.file.path.replace("\\", "/");
   
  } else {
    image_url = "";
  }
  const email = req.body.email;
  const password = req.body.password;
  const earning_hour = req.body.earning_hour;
  db.query(
    "INSERT INTO user (email, password, image_url, earning_hour) VALUES (?,?,?,?)",
    [email, password, image_url, earning_hour],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    });
 
 
  // res.send(`User created [OK]$`);
});
// Sign In User
app.get("/api/get/user", (req, res) => {
  db.query("SELECT * FROM user;", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
   
  });
  
});

// Get day time from user
app.get("/api/get/time/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM DayTime WHERE id_user = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
 
});

// Get month time from user
app.get("/api/get/month/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM MonthTime WHERE id_user = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
 
});
// Create  time of day
app.post("/api/create/time/:id", (req, res) => {
  const id = req.params.id;
  const company = req.body.companyName;
  const start = req.body.startHour;
  const end = req.body.endHour;
  const total = req.body.total;
  const dateCreated = req.body.dateCreate;

  db.query(
    "INSERT INTO DayTime (id_user, company, start, end, total, dateCreated) VALUES (?,?,?,?,?,?)",
    [id, company, start, end, total, dateCreated],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
 
});
// Create  time of year
app.post("/api/create/month/:id", (req, res) => {
  const id = req.params.id;
  const month = req.body.month;
  const total = req.body.hoursDone;
  const dateCreated = req.body.dateCreate;

  db.query(
    "INSERT INTO MonthTime (id_user, month, total, dateCreated) VALUES (?,?,?,?)",
    [id, month, total, dateCreated],
    (err, result) => {
      if (err) {
        console.log(err);
        
      }
      res.send(result);
     
    }
  );
 
});

// Delete SQl Query
app.delete("/api/delete/time/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM DayTime WHERE ID= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
    
  });
  
});
app.delete("/api/delete/month/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM MonthTime WHERE ID= ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
 
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
