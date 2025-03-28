import { Router } from "express";
import { SaveToJSON } from "../lib/data-storage.js";
import { ParseNested } from "../lib/parse-nested.js";

/**
 * @type {Router}
 */
const router = Router();

router.get("/products/edit/:id", async (req, res) => {
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

router.put("/api/products/:id", async (req, res) => {
    // Just to help with LSP auto suggestions
    /**
     * @type {Array}
     */

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

    // Detirmine whether specification
    // input format needs to have nested 
    // value fixed
    let specifications = req.query.HTMLFormFix
        ? ParseNested(req.body, "specifications")
        : req.body.specifications;

    // Update entry with new values
    entries[index] = {
        product_id: entry.product_id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        specifications: specifications,
    };

    // Save to JSON and update locals
    await SaveToJSON("src/products.json", entries);
    req.app.set("entries", entries);

    // Return 200 OK
    res.status(200);
    if (res.locals.shouldRedirect) {
        return res.redirect("/products");
    }

    // Send updated entry with new values
    res.send(entries[index]);
});

export { router };
