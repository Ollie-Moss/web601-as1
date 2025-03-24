import { Router } from "express";
import { SaveToJSON } from "../lib/data-storage.js";
import { ParseNested } from "../lib/parse-nested.js";

/**
 * @type {Router}
 */
const router = Router();

router.get("/edit-product/:id", async (req, res) => {
    let entries = req.app.get("entries");
    const id = req.params.id;
    let entry = entries.filter((e) => e.product_id == id)[0];
    let index = entries.indexOf(entry);
    if (index == -1) {
        res.status(404).render("404");
        return;
    }

    res.render("new-product", { entry: entry });
});

router.put("/edit-product/:id", async (req, res) => {
    /**
     * @type {Array}
     *
     */
    let entries = req.app.get("entries");
    const id = req.params.id;

    let entry = entries.filter((e) => e.product_id == id)[0];
    let index = entries.indexOf(entry);

    if (index == -1) {
        res.status(404).render("404");
        return;
    }

    entries[index] = {
        product_id: entry.product_id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        specifications: ParseNested(req.body, "specifications"),
    };

    await SaveToJSON("src/products.json", entries);
    req.app.set("entries", entries);
    res.redirect("/products");
});

export { router };
