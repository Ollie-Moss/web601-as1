import { Router } from "express";
import { v4 as uuidv4, v4 } from "uuid";
import { SaveToJSON } from "../lib/data-storage.js";
import { ParseNested } from "../lib/parse-nested.js";

/**
 * @type {Router}
 */
const router = Router();

router.get("/products/new", (req, res) => {
    const entries = req.app.get("entries");
    res.render("new-product");
});

router.post("/api/products", (req, res) => {
    const entries = req.app.get("entries");
    // validation required

    console.log(req.body);
    const entry = {
        product_id: uuidv4(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        specifications: ParseNested(req.body, "specifications"),
    };

    // add to entries
    entries.push(entry);
    req.app.set("entries", entries);
    SaveToJSON("src/products.json", entries);

    res.redirect("/products");
});

export { router };
