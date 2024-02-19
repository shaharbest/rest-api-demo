const db = require('./db');
const Product = require('./models/Product');

let products = [
    { id: '101', name: 'nuclear missle', price: 7 },
    { id: '102', name: 'pita bread', price: 42 },
    { id: '103', name: 'apple', price: 99 },
];

main();

async function main() {
    db.connect();
    console.log('resetting db...');
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('finished!');
    db.disconnect();
}