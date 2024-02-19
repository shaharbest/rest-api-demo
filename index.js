const express = require('express');
const uuid = require('uuid');

const app = express();

let products = [
    { id: '101', name: 'nuclear missle', price: 7 },
    { id: '102', name: 'pita bread', price: 42 },
    { id: '103', name: 'apple', price: 99 },
];

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    const givenID = req.params.id;
    const searchedProduct = products.find(p => p.id === givenID);
    res.json(searchedProduct);
});

app.post('/products', (req, res) => {
    const newProduct = {
        id: uuid.v4(),
        ...req.body
    };

    products.push(newProduct);
    res.send(`product ${newProduct.name} was inserted`);
});

app.delete('/products/:id', (req, res) => {
    const givenID = req.params.id;
    products = products.filter(p => p.id !== givenID);
    res.send(`product with id ${givenID} was deleted`);
});

app.patch('/products/:id', (req, res) => {
    const givenID = req.params.id;
    const productIndex = products.findIndex(p => p.id === givenID);

    const updatedProps = req.body;

    products[productIndex] = { ...products[productIndex], ...updatedProps };

    res.send(`product with id ${givenID} was updated`);
});

app.listen(3000, () => {
    console.log('listen to port', 3000);
});