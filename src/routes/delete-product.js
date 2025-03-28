import { Router } from "express";
import { SaveToJSON } from "../lib/data-storage.js";
import { CheckRedirect } from "../lib/checkRedirect.js";

/**
 * @type {Router}
 */
const router = Router();

router.delete("/api/products/:id", CheckRedirect, async (req, res, next) => {
    // Get current entries and retrieve id
    let entries = req.app.get("entries");
    const id = req.params.id;

    // Find product in list
    let entry = entries.filter((e) => e.product_id == id)[0];
    let index = entries.indexOf(entry);

    // If entry not found return 404 Not found
    if (index == -1) {
        res.status(404);

        // Redirect to 404 not found page
        if (res.locals.shouldRedirect) {
            res.redirect("404");
        }
    }

    // Remove product from list and save to JSON and update locals
    entries = entries.filter((entry) => entry.product_id != id);
    await SaveToJSON("src/products.json", entries);
    req.app.set("entries", entries);

    // Return 200 OK
    res.status(200);
    if (res.locals.shouldRedirect) {
        res.redirect("/products");
    }
});

export { router };
