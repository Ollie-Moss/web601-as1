import { Router } from "express";
import { v4 as uuidv4, v4 } from "uuid";
import { SaveToJSON } from "../lib/data-storage.js";

/**
 * @type {Router}
 */
const router = Router();

router.get("/new-product", (req, res) => {
    const entries = req.app.get("entries");
    res.render("new-product");
});

router.post("/new-product", (req, res) => {
    const entries = req.app.get("entries");
    // validation required

    console.log(req.body)
    // add to entries
    entries.push({
        product_id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        specifications: {},
    });
    req.app.set("entries", entries);
    SaveToJSON("src/products.json", entries);

    res.redirect("/products");
});

export { router };
