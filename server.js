var express = require("express");
var path = require("path");

var app = express();
var port = 8080;

app.use(express.static(path.join(__dirname, "public")));

// Fix — serve serviceWorker.js with correct MIME type
app.get("/serviceWorker.js", function(req, res) {
    res.setHeader("Content-Type", "application/javascript");
    res.sendFile(path.join(__dirname, "public", "serviceWorker.js"));
});

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(port, function() {
    console.log("server on " + port);
});