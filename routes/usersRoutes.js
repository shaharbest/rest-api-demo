const express = require('express');
const productsRouter = express.Router();
const uuid = require('uuid');

let products = [
    { id: '101', name: 'nuclear missle', price: 7 },
    { id: '102', name: 'pita bread', price: 42 },
    { id: '103', name: 'apple', price: 99 },
];

productsRouter.get('/', (req, res) => {
    res.json(products);
});

productsRouter.get('/:id', (req, res) => {
    const givenID = req.params.id;
    const searchedProduct = products.find(p => p.id === givenID);
    res.json(searchedProduct);
});

productsRouter.post('/', (req, res) => {
    const newProduct = {
        id: uuid.v4(),
        ...req.body
    };

    products.push(newProduct);
    res.send(`product ${newProduct.name} was inserted`);
});

productsRouter.delete('/:id', (req, res) => {
    const givenID = req.params.id;
    products = products.filter(p => p.id !== givenID);
    res.send(`product with id ${givenID} was deleted`);
});

productsRouter.patch('/:id', (req, res) => {
    const givenID = req.params.id;
    const productIndex = products.findIndex(p => p.id === givenID);
    const updatedProps = req.body;
    products[productIndex] = { ...products[productIndex], ...updatedProps };
    res.send(`product with id ${givenID} was updated`);
});

module.exports = productsRouter;