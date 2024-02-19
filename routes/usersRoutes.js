const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/User');
const usersRoutes = express.Router();

usersRoutes.get('/', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

usersRoutes.get('/:id', async (req, res) => {
    const givenID = req.params.id;
    const searchedUser = await User.findById(givenID);
    res.json(searchedUser);
});

usersRoutes.post('/login', async (req, res) => {
    try {
		const user = await User.findOne({ email: req.body.email });

		if (!user) return res.status(400).send('unknown email');

		const hashedSaltedPass = user.password;
		const givenPass = req.body.password;

		if (await bcrypt.compare(givenPass, hashedSaltedPass))
			res.send('success');
		else
			res.status(401).send('not allowed');
	}
	catch {
        console.error(err);
		res.status(500).send('server error');
	}
});

usersRoutes.post('/', async (req, res) => {
    try {
		const givenPass = req.body.password;
		const hashedPass = await bcrypt.hash(givenPass, 10);

		const newUser = {
			name: req.body.name,
			email: req.body.email,
			password: hashedPass,
		};

        await User.create(newUser);
		res.sendStatus(201);
	}
	catch (err) {
        console.error(err);
		res.sendStatus(500);
	}
});

usersRoutes.delete('/:id', async (req, res) => {
    const givenID = req.params.id;
    await User.findByIdAndDelete(givenID);
    res.send(`user with id ${givenID} was deleted`);
});

usersRoutes.patch('/:id', async (req, res) => {
    const givenID = req.params.id;
    const updatedProps = req.body;
    await User.findByIdAndUpdate(givenID, updatedProps)
    res.send(`user with id ${givenID} was updated`);
});

module.exports = usersRoutes;