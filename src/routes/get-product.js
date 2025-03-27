import { Router } from "express";

/**
 * @type {Router}
 */
const router = Router();

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.get("/products", async (req, res) => {
    const data = await fetch("http://localhost:3000/api/products");
    const entries = await data.json();
    console.log("data: " + entries.products);
    res.render("products", { entries: entries.products});
});

router.get("/api/products", (req, res) => {
    const entries = req.app.get("entries");
    res.status(200).send({ products: entries });
});

export { router };
