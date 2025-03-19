import { Router } from "express";
import { SaveToJSON } from "../lib/data-storage.js";

/**
 * @type {Router}
 */
const router = Router();

router.delete("/delete-product/:id", async (req, res) => {
    let entries = req.app.get("entries");
    const id = req.params.id;
    entries = entries.filter((entry) => entry.product_id != id);
    await SaveToJSON("src/products.json", entries);
    req.app.set("entries", entries);
    res.redirect("/products");
});

export { router };
