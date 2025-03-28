import { Router } from "express";
import { SaveToJSON } from "../lib/data-storage.js";
import { CheckRedirect } from "../lib/checkRedirect.js";

/**
 * @type {Router}
 */
const router = Router();

router.delete("/api/products/:id", CheckRedirect, async (req, res) => {
    // Get current entries and retrieve id
    let entries = req.app.get("entries");
    const id = req.params.id;
    console.log(`DELETE /api/products/${id}`)
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

    console.log("Removing product from product list");
    console.log("Updating database with new product list");
    // Remove product from list and save to JSON and update locals
    entries = entries.filter((entry) => entry.product_id != id);
    await SaveToJSON("src/products.json", entries);
    req.app.set("entries", entries);

    // Return 200 OK
    console.log("Status: 200 OK");
    res.status(200);
    if (res.locals.shouldRedirect) {
        console.log("Redirect enabled\nRedirecting to /products");
        return res.redirect("/products");
    }

    res.sendStatus(200);
});

export { router };
