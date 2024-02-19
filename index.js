const express = require('express');
const app = express();
const db = require('./db');

db.connect();

app.use(express.json());

app.get('/ping', (req, res) => {
    res.send('pong');
});

app.use('/products', require('./routes/productsRoutes'));
app.use('/users', require('./routes/usersRoutes'));

app.listen(3000, () => {
    console.log('listen to port', 3000);
});