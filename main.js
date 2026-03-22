class Product {
    #price;
    constructor(id,name, price, stock) {
        this.id = id;
        this.name = name;
        this.#price = price;
        this.stock = stock;
    };

    reduceStock(quantity) {
        if(quantity > this.stock) {
            throw  new Error(`Not enough stock for ${this.name}`);
        }
        this.stock-=quantity;
    }
    getPrice() {
        return this.#price;
    }
    getSummary() {
        return `${this.name} - ${this.#price}`;
    }
}

class Customer {
    constructor(id, name, email, address, phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.address = address;
        this.phone = phone
    };
}

class Order {
    #products = [];
    constructor(orderId, customer) {
        this.orderId = orderId;
        this.customer = customer;
    };
    addProduct(product, quantity) {
        product.reduceStock(quantity);
        this.#products.push({
            product: product,
            quantity: quantity
        });
    }
    calculateTotalPrice() {
        let totalPrice = 0;
        this.#products.forEach(product => {
            totalPrice += product.product.getPrice() * product.quantity;
        });
        return totalPrice;
    }

    displayOrderSummary() {
        console.log(`----Order Summary: #${this.orderId}----`);
        console.log(`Customer: ${this.customer.name}`);
        console.log(`Email: ${this.customer.email}`);
        console.log(`Address: ${this.customer.address}`);
        console.log(`Phone: ${this.customer.phone}`);
        console.log('Products:');
        this.#products.forEach(product => {
            console.log(`- ${product.product.getSummary()} x ${product.quantity}`);
        });
        console.log(`Total Price: ${this.calculateTotalPrice()}`);
    }
}

let smartPhone = new Product(1,'Smartphone', 500, 10);
let laptop = new Product(2,'Laptop', 1000, 4);
let mouse = new Product(3,'Mouse', 50, 2);

let customer = new Customer(1,'Hagar', 'hagar@gmail.com', 'Mansoura', '01015556575');

let order = new Order(1, customer);
order.addProduct(smartPhone,1);
order.addProduct(laptop,1);
order.addProduct(mouse, 2);

order.displayOrderSummary();