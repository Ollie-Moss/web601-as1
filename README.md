# Product Management API

This repository provides a set of routes to manage products in a system. 
These routes allow for basic CRUD operations of viewing, creating, editing, and deleting products.
These CRUD operations can be done through both the page routes and API routes provided.

## Table of Contents

- [Page Routes](#page-routes)
  - [GET `/products`](#get-products)
  - [GET `/products/new`](#get-productsnew)
  - [GET `/products/edit/:id`](#get-productseditid)
- [API Routes](#api-routes)
  - [GET `/api/products`](#get-apiproducts)
  - [POST `/api/products`](#post-apiproducts)
  - [PUT `/api/products/:id`](#put-apiproductsid)
  - [DELETE `/api/products/:id`](#delete-apiproductsid)

---

## Page Routes

### **GET `/products`**

**Purpose:**  
Display a list of all available products.

**Description:**  
When a user navigates to `/products`, the server fetches all products from the database and renders a webpage with the product list. Options to edit or delete products are also provided.

**Example Request:**
```http
GET /products HTTP/1.1
Host: localhost:3000
```

**Example Response:**
```html
<Webpage HTML>
```

---

### **GET `/products/new`**

**Purpose:**  
Display a form to create a new product.

**Description:**  
Navigating to `/products/new` presents a form to input a new product's details. Users can choose to either save or cancel the creation of the product.

**Example Request:**
```http
GET /products/new HTTP/1.1
Host: localhost:3000
```

**Example Response:**
```html
<Webpage HTML>
```

---

### **GET `/products/edit/:id`**

**Purpose:**  
Provide a form to edit an existing product.

**Description:**  
When a user navigates to `/products/edit/:id`, the server fetches the product with the corresponding `id` and pre-fills a form with the product’s existing attributes. The user can then modify the details and save or cancel the changes.

**Example Request:**
```http
GET /products/edit/590b02a3-fad5-4768-a0f7-ee6a5160d371 HTTP/1.1
Host: localhost:3000
```

**Example Response:**
```html
<Webpage HTML>
```

---

## API Routes

### **GET `/api/products`**

**Purpose:**  
Fetch all products in JSON format.

**Description:**  
When a GET request is made to this route, the server fetches all products from the database and sends them back as a JSON response.

**Example Request:**
```http
GET /api/products HTTP/1.1
Host: localhost:3000
```

**Example Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "products": [
    {
      "product_id": "590b02a3-fad5-4768-a0f7-ee6a5160d371",
      "name": "new product",
      "description": "this is a description",
      "type": "this is a type",
      "category": "super interesting category",
      "specifications": {
        "specification 1": "super cool value"
      }
    }
  ]
}
```

---

### **POST `/api/products`**

**Purpose:**  
Create a new product in the database.

**Description:**  
This route creates a new product using the data sent in the request body. It responds with the newly created product. The request supports two query parameters: `HTMLFormFix` and `redirect`.

- **HTMLFormFix:** When enabled, it allows you to send nested JSON objects (like `specifications`) as flattened top-level key-value pairs prefixed with `specifications.`. The server will parse this and restructure the data.
- **redirect:** If true, redirects to the `/products` page after successful creation.

**Example Input:**
```json
{
  "product_id": "590b02a3-fad5-4768-a0f7-ee6a5160d371",
  "name": "new product",
  "description": "this is a description",
  "type": "this is a type",
  "category": "super interesting category",
  "specifications.specification 1": "super cool value"
}
```

**Example Output:**
```json
{
  "products": [
    {
      "product_id": "590b02a3-fad5-4768-a0f7-ee6a5160d371",
      "name": "new product",
      "description": "this is a description",
      "type": "this is a type",
      "category": "super interesting category",
      "specifications": {
        "specification 1": "super cool value"
      }
    }
  ]
}
```

**Example Request:**
```http
POST /api/products HTTP/1.1
Content-Type: application/json
Host: localhost:3000

{
  "name": "new product",
  "description": "this is a description",
  "type": "this is a type",
  "category": "super interesting category",
  "specifications": {
    "specification 1": "super cool value"
  }
}
```

**Example Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "product_id": "590b02a3-fad5-4768-a0f7-ee6a5160d371",
  "name": "new product",
  "description": "this is a description",
  "type": "this is a type",
  "category": "super interesting category",
  "specifications": {
    "specification 1": "super cool value"
  }
}
```

---

### **PUT `/api/products/:id`**

**Purpose:**  
Update an existing product.

**Description:**  
This route updates a product with the given `id` using the data sent in the request body.

**Example Request:**
```http
PUT /api/products/0db909cf-215f-466e-a988-d5ae4e8d1021 HTTP/1.1
Content-Type: application/json
Host: localhost:3000

{
  "name": "different name",
  "description": "this is a description",
  "type": "this is a type",
  "category": "super interesting category",
  "specifications": {
    "specification 1": "super cool value",
    "new specification": "another super cool value"
  }
}
```

**Example Response:**
```json
HTTP/1.1 200 OK
Content-Type: application/json; charset=utf-8

{
  "product_id": "0db909cf-215f-466e-a988-d5ae4e8d1021",
  "name": "different name",
  "description": "this is a description",
  "type": "this is a type",
  "category": "super interesting category",
  "specifications": {
    "specification 1": "super cool value",
    "new specification": "another super cool value"
  }
}
```

---

### **DELETE `/api/products/:id`**

**Purpose:**  
Delete a product from the database.

**Description:**  
This route deletes the product with the given `id` from the database.

**Example Request:**
```http
DELETE /api/products/3ea5b396-3095-4722-9261-d24f357ed501 HTTP/1.1
Host: localhost:3000
```

**Example Response:**
```text
HTTP/1.1 200 OK

OK
```

---

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

