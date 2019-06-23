// Dependencies
// =============================================================
var path = require("path");
var friends = require("../data/friends");

// Routes
// =============================================================
module.exports = function(app) {

    //Home Page Routing
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    //Survey Page Routing
    app.get("/survey", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });

    //Displays JSON data
    app.get("/data", function(req, res) {
        res.send(friends);
    });
}