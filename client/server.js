const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();

app.use(compression());

// build folder will be created when running npm run build
app.use(express.static(path.join(__dirname, "build")));

// index.html (React app) will be served from within the build folder
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
