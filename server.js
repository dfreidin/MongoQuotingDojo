const express = require("express");
const app = express();
const body_parser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "ejs");
app.use(body_parser.urlencoded({extended: true}));
mongoose.connect("mongodb://localhost/quoting_dojo");
var QuoteSchema = new mongoose.Schema({
    name: {type: String, required: true, minlength: 2},
    quote: {type: String, required: true, minlength: 2},
}, {timestamps: true});
mongoose.model("Quote", QuoteSchema);
var Quote = mongoose.model("Quote");
app.get("/", function(req, res){
    res.render("index");
});
app.post("/quotes", function(req, res){
    var quote = new Quote({name: req.body.name, quote: req.body.quote});
    quote.save(function(err){
        if(err) {
            res.render("index", {errors: quotes.errors});
        }
        else {
            res.redirect("/quotes");
        }
    });
});
app.get("/quotes", function(req, res){
    Quote.find({}, null, {sort: "-createdAt"}, function(err, quotes){
        res.render("quotes", {quotes: quotes});
    });
});
app.listen(8000);