import { Router } from "express";

/**
 * @type {Router}
 */
const router = Router();

router.get("/", (req, res) => {
    res.redirect("/products");
});

router.get("/products", (req, res) => {
    const entries = req.app.get("entries");
    res.render("products", { entries: entries });
});

export { router };
