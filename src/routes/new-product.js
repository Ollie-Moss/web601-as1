import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import { SaveToJSON } from "../lib/data-storage.js";
import { ParseNested } from "../lib/parse-nested.js";
import { CheckRedirect } from "../lib/checkRedirect.js";

/**
 * @type {Router}
 */
const router = Router();

// Render new products page
router.get("/products/new", (req, res) => {
    res.render("new-product");
});

router.post("/api/products", CheckRedirect, (req, res) => {
    console.log("POST /api/products");
    // Get current products list
    const entries = req.app.get("entries");

    // Detirmine whether specification
    // input format needs to have nested
    // value fixed
    let specifications;
    if (req.query.HTMLFormFix) {
        console.log("HTMLFormFix enabled, nesting specifications");
        specifications = ParseNested(req.body, "specifications");
    }else{
        specifications = req.body.specifications;
    }

    // Create new entry
    const entry = {
        product_id: uuidv4(),
        name: req.body.name ?? "",
        description: req.body.description ?? "",
        type: req.body.type ?? "",
        category: req.body.category ?? "",
        specifications: specifications ?? {},
    };
    console.log(`Created Product:\n`, entry);

    console.log("Adding to products list, and saving to database")
    // Add to entries, save to JSON and update locals
    entries.push(entry);
    req.app.set("entries", entries);
    SaveToJSON("src/products.json", entries);

    console.log("Status: 200 OK")
    // Status 200 OK and redirect if required
    res.status(200);
    if (res.locals.shouldRedirect) {
        console.log("Redirect enabled\nRedirecting to /products")
        return res.redirect("/products");
    }

    console.log("Sending new product")
    // Send new entry with ID
    res.send(entry);
});

export { router };
