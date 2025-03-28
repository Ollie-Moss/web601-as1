import { Router } from "express";

/**
 * @type {Router}
 */
const router = Router();

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.get("/products", async (req, res) => {
    // fetch products from api route and parse data
    const data = await fetch("http://localhost:3000/api/products");
    const entries = await data.json();

    // render products page
    res.render("products", { entries: entries.products });
});

router.get("/api/products", (req, res) => {
    console.log("GET /api/products")
    // get products from locals
    const entries = req.app.get("entries");
    console.log("Retrieved products\n", entries)
    // status 200 OK and send products list
    console.log("Status: 200 OK")
    console.log("Sending products list")
    res.status(200).send({ products: entries });
});

export { router };
