// const express = require("express");
// const router = express.Router();
// const Article = require("../models/article");
// const multer = require("multer");
// fileName = "";
// const myStorage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, redirect) => {
//     let data = Date.now();
//     let fl = data + "." + file.mimetype.split("/")[1];
//     redirect(null, fl);
//     fileName = fl;
//   },
// });
// const upload = multer({ storage: myStorage });

// router.post("/ajout", upload.any("image"), (req, res) => {
//   let data = req.body;
//   let article = new Article(data);
//   article.date = new Date();
//   article.image = fileName;
//   article.tags = data.tags.split(",");
//   article
//     .save()
//     .then((saved) => {
//       fileName = "";
//       res.status(200).send(saved);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// router.get("/all", (req, res) => {
//   Article.find({})
//     .then((articles) => {
//       res.status(200).send(articles);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// router.get("/getById/:id", (req, res) => {
//   let id = req.params.id;
//   Article.findOne({ _id: id })
//     .then((articles) => {
//       res.status(200).send(articles);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// router.get("/getByIdAuthor/:id", (req, res) => {
//   let id = req.params.id;
//   Article.find({ idAuthor: id })
//     .then((articles) => {
//       res.status(200).send(articles);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });
// router.delete("/supprimer/:id", (req, res) => {
//   let id = req.params.id;
//   Article.findByIdAndDelete({ _id: id })
//     .then((article) => {
//       res.status(200).send(article);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });
// router.put("/update/:id", upload.any("image"), (req, res) => {
//   let id = req.params.id;
//   let data = req.body;
//   data.tags = data.tags.split(",");
//   if (fileName.length > 0) {
//     data.image = fileName;
//   }
//   Article.findByIdAndUpdate({ _id: id }, data)
//     .then((article) => {
//       fileName = "";
//       res.status(200).send(article);
//     })
//     .catch((error) => {
//       res.status(400).send(error);
//     });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Article = require("../models/article");
const multer = require("multer");
const path = require("path");

// إعداد التخزين
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

router.post("/ajout", upload.single("image"), (req, res) => {
  const data = req.body;
  const article = new Article(data);
  article.date = new Date();
  article.image = req.file.filename;
  article.tags = data.tags.split(",");

  article
    .save()
    .then((saved) => res.status(200).send(saved))
    .catch((error) => res.status(400).send(error));
});

router.get("/all", (req, res) => {
  Article.find({})
    .then((articles) => res.status(200).send(articles))
    .catch((error) => res.status(400).send(error));
});
router.get("/getById/:id", (req, res) => {
  let id = req.params.id;
  Article.findOne({ _id: id })
    .then((articles) => {
      res.status(200).send(articles);
    })
    .catch((error) => {
      res.status(400).send(error);
    });
});

module.exports = router;
