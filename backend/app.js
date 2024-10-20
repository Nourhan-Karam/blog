// const express = require("express");
// const app = express();
// const cors = require("cors");
// app.use(cors());
// const articleApi = require("./routes/article");
// const authorApi = require("./routes/author");

// require("./config/connect");

// app.use(express.json());
// app.use("/article", articleApi);
// app.use("/author", authorApi);

// app.use("/getimage", express.static("/uploads"));
// app.listen(3000, () => {
//   console.log("Server started on port 3000");
// });

const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

app.use(cors());
const articleApi = require("./routes/article");
const authorApi = require("./routes/author");

require("./config/connect");

app.use(express.json());
app.use("/article", articleApi);
app.use("/author", authorApi);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
