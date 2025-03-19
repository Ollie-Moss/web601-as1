const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const GetProduct = require("./routes/get-product");
const NewProduct = require("./routes/new-product");
const EditProduct = require("./routes/edit-product");
const DeleteProduct = require("./routes/delete-product");
const { LoadFromJSON } = require("./lib/data-storage");

// :setup
const app = express();
const PORT = 3000;

LoadFromJSON("src/products.json").then((data) => {
    app.set("entries", data);
});

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));
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
app.use(express.static("public"));

// :routes
app.use(GetProduct.router);
app.use(NewProduct.router);
app.use(EditProduct.router);
app.use(DeleteProduct.router);

app.use((req, res) => {
    res.status(404).render("404");
});

// :server
app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});
