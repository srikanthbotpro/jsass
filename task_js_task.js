/*Assignment: Product Inventory Management System
Objective: Create a JavaScript-based product inventory management system that allows users to add, search, and analyze products based on various properties. This project will involve handling objects, arrays, strings, and numbers.
 
Requirements:
 
Define a Product object with specific properties such as name, price, quantity, and category.
Implement a function to add new products to an inventory array.
Create a feature to find and display specific products from the inventory.
Allow users to search for products based on keywords.
Validate that certain properties of the Product object are of the correct data type.
Ensure that numerical properties meet specific safety conditions.
Implement a feature to compare certain properties between two products.
Include functionality to manipulate and display numerical data in specific ways.
Provide a check to determine the status of a product’s availability.
Expected Outcome:
 
The system should allow users to add, view, and manage multiple products in the inventory.
The program should correctly handle, process, and display both textual and numerical data related to each product.

Code :*/
function Product(name, price, quantity, category) {
    if (typeof name !== 'string' || typeof category !== 'string') throw new Error("Name and category should be text.");
    if (typeof price !== 'number' || typeof quantity !== 'number') throw new Error("Price and quantity should be numbers.");
    if (price < 0 || quantity < 0) throw new Error("Price and quantity must be non-negative.");

    this.name = name;
    this.price = price;
    this.quantity = quantity;
    this.category = category;
}

Product.prototype.isAvailable = function() {
    return this.quantity > 0;
};

function Inventory() {
    this.products = [];
}

Inventory.prototype.addProduct = function(product) {
    if (product instanceof Product) this.products.push(product);
    else throw new Error("Invalid product.");
};

Inventory.prototype.findProductByName = function(name) {
    return this.products.filter(function(product) {
        return product.name.toLowerCase().includes(name.toLowerCase());
    });
};

Inventory.prototype.searchProductsByKeyword = function(keyword) {
    return this.products.filter(function(product) {
        return product.name.toLowerCase().includes(keyword.toLowerCase()) ||
               product.category.toLowerCase().includes(keyword.toLowerCase());
    });
};

Inventory.prototype.compareProducts = function(product1, product2, property) {
    if (!(product1 instanceof Product) || !(product2 instanceof Product)) throw new Error("Arguments should be products.");
    if (!(property in product1) || !(property in product2)) throw new Error("Invalid property.");
    if (product1[property] === product2[property]) return 'Equal';
    return product1[property] > product2[property] ? 'Product 1 is higher' : 'Product 2 is higher';
};

Inventory.prototype.getProductStatistics = function() {
    let totalValue = this.products.reduce(function(acc, product) {
        return acc + (product.price * product.quantity);
    }, 0);
    let averagePrice = this.products.length > 0 ? (totalValue / this.products.length) : 0;
    return { totalValue: totalValue, averagePrice: averagePrice };
};

Inventory.prototype.displayInventory = function() {
    return this.products.map(function(product) {
        return {
            Name: product.name,
            Price: "$" + product.price.toFixed(2),
            Quantity: product.quantity,
            Category: product.category,
            Available: product.isAvailable() ? "In Stock" : "Out of Stock"
        };
    });
};

var inventory = new Inventory();

try {
    var product1 = new Product("Laptop", 1500, 5, "Electronics");
    var product2 = new Product("Phone", 700, 10, "Electronics");
    var product3 = new Product("Shoes", 120, 15, "Apparel");

    inventory.addProduct(product1);
    inventory.addProduct(product2);
    inventory.addProduct(product3);

    console.log(inventory.displayInventory());
    console.log(inventory.findProductByName("phone"));
    console.log(inventory.searchProductsByKeyword("Electronics"));
    console.log(inventory.compareProducts(product1, product2, "price"));
    console.log(inventory.getProductStatistics());
} catch (error) {
    console.error(error.message);
}
