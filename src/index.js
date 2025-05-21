// --- Node Packages ---

// Import path module to parse relative paths
const path = require("path");

// Import Express.JS package for build web app
const express = require("express");

// Method override to redirect form submissions to desired HTTP methods
const methodOverride = require("method-override");

// Parses the body of incoming requests
// and makes them accessible through req.body
const bodyParser = require("body-parser");

// API routes
const GetProduct = require("./routes/get-product");
const NewProduct = require("./routes/new-product");
const EditProduct = require("./routes/edit-product");
const DeleteProduct = require("./routes/delete-product");

// Helper function
const { LoadFromJSON } = require("./lib/data-storage");

// :setup
const app = express();
const PORT = 3000;

// Load existing products upon start up
LoadFromJSON("src/products.json").then((data) => {
    app.set("entries", data);
});

// Set templating engine with views directory
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

// Use imported middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    methodOverride(function (req, res) {
        if (req.body && typeof req.body === "object" && "_method" in req.body) {
            // look in urlencoded POST bodies and delete it
            var method = req.body._method;
            delete req.body._method;
            return method;
        }
    }),
);

// :web directory
app.use(express.static(path.join(__dirname, "public")));

// :routes
app.use(GetProduct.router);
app.use(NewProduct.router);
app.use(EditProduct.router);
app.use(DeleteProduct.router);

// error handling
app.use((error, req, res) => {
    console.log(error);
    res.status(404).render("404");
});

// :server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
