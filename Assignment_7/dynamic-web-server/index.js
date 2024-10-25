const express = require('express');

const app = express();

app.get('/', (req, res) => {
	res.send('Welcome to the Dynamic Web Server Home Page');
});

app.get('/about', (req, res) => {
	res.send('This is the About Page');
});

app.get('/contact', (req, res) => {
	res.send('Contact us at: email@example.com');
});

app.get('/users/:id', (req, res) => {
	const userId = req.params.id;
	res.send(`Welcome user "${userId}"`);
});

app.get('/products/:category/:productId', (req, res) => {
	const { category, productId } = req.params;
	res.json({ category, productId });
});

app.use((req, res) => {
	res.status(404).send('Page Not Found');
});

app.listen(3001, () => {
	console.log('Server is running on http://localhost:3001');
});
