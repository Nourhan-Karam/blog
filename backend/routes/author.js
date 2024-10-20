const express = require("express");
const router = express.Router();
const Author = require("../models/author");
const multer = require("multer");
const bcrypt = require("bcrypt");
fileName = "";
const myStorage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, redirect) => {
    let data = Date.now();
    let fl = data + "." + file.mimetype.split("/")[1];
    redirect(null, fl);
    fileName = fl;
  },
});
const upload = multer({ storage: myStorage });
const jwt = require("jsonwebtoken");

router.post("/register", upload.any("image"), (req, res) => {
  data = req.body;
  author = new Author(data);
  author.image = fileName;
  salt = bcrypt.genSaltSync(10);
  author.password = bcrypt.hashSync(data.password, salt);
  author
    .save()
    .then((SaveAuthor) => {
      fileName = "";
      res.status(200).send(SaveAuthor);
    })
    .catch((Error) => {
      res.status(500).send(Error);
    });
});

router.post("/login", (req, res) => {
  let data = req.body;
  Author.findOne({ email: data.email })
    .then((author) => {
      let vaild = bcrypt.compareSync(data.password, author.password);
      if (!vaild) {
        res.send("email and password invalid");
      } else {
        let payload = {
          _id: author._id,
          email: author.email,
          fullname: author.name + " " + author.lastName,
        };
        let token = jwt.sign(payload, "123456789");
        res.send({ mytoken: token });
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

router.get("/all", (req, res) => {
  Author.find({})
    .then((authors) => {
      res.status(200).send(authors);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.get("/getById/:id", (req, res) => {
  let id = req.params.id;
  Author.findOne({ _id: id })
    .then((author) => {
      res.status(200).send(author);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

router.delete("/supprimer/:id", (req, res) => {
  let id = req.params.id;
  Author.findByIdAndDelete({ _id: id })
    .then((author) => {
      res.status(200).send(author);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

// router.put("/update/:id", (req, res) => {});

module.exports = router;
