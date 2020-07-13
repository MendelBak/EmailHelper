const express = require("express");
const app = express();

// route handler for requests for root path.
app.get("/", (req, res) => {
  res.send({ hi: "hello" });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);
