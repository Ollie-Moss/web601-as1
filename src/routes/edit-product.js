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
    res.render("new-product", { entry: entry, editing: true });
});

router.put("/api/products/:id", async (req, res, next) => {
    // Just to help with LSP auto suggestions
    /**
     * @type {Array}
     */

    // Get current entries and retrieve id
    let entries = req.app.get("entries");
    const id = req.params.id;
    console.log(`PUT /api/products/${id}`);
    console.log(`Retrieving Product with id: ${id}`);

    // Find product in list
    let entry = entries.filter((e) => e.product_id == id)[0];
    let index = entries.indexOf(entry);

    // If entry not found return 404 Not found
    if (index == -1) {
        console.log(`Could not find product with id: ${id}`);
        console.log("Status: 404 Not Found");

        // Redirect to 404 not found page
        if (res.locals.shouldRedirect) {
            console.log("Redirect enabled\nRedirecting to /404");
            return res.status(404).render("404");
        }
        return res.sendStatus(404);
    }
    console.log("Found product\n", entry);

    console.log("Updating values");

    // Detirmine whether specification
    // input format needs to have nested
    // value fixed
    let specifications;
    if (req.query.HTMLFormFix) {
        console.log("HTMLFormFix enabled, nesting specifications");
        specifications = ParseNested(req.body, "specifications");
    } else {
        specifications = req.body.specifications;
    }

    // Create product with new values
    const newEntry = {
        product_id: entry.product_id,
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        category: req.body.category,
        specifications: specifications,
    };
    console.log("Updated product with new values\n", newEntry);

    // Update entry with new values
    entries[index] = newEntry;

    console.log("Updating products list, and saving to database");

    // Save to JSON and update locals
    try {
        await SaveToJSON("src/products.json", entries);
    } catch (error) {
        console.log(`Error while saving to JSON: ${error.message}`);
        next(error);
        return;
    }
    req.app.set("entries", entries);

    // Return 200 OK
    console.log("Status: 200 OK");
    res.status(200);
    if (res.locals.shouldRedirect) {
        console.log("Redirect enabled\nRedirecting to /products");
        return res.redirect("/products");
    }

    console.log("Sending updated product");
    // Send updated entry with new values
    res.send(entries[index]);
});

export { router };
