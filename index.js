const express = require('express');
const app = express();
const fs = require('fs');
require('dotenv').config();

app.get('/', (req, res) => {
	res.json({ message: 'Hello World' });
});

app.get('/search', (request, response) => {
	const city = request.query.city;
	const startDate = request.query.start_date;
	console.log('city:', city);
	console.log('startDate:', startDate);

	fetch(
		`https://api.seatgeek.com/2/events?taxonomies.name=nba&venue.city=${city}&datetime_utc.gt=${startDate}&client_id=${process.env.CLIENT_ID}`
	)
		.then((seatGeekResponse) => seatGeekResponse.json())
		.then((seatGeekData) => {
			console.log('seatGeekData:', seatGeekData);
			response.status(200).json(seatGeekData);
		})
		.catch((error) => {
			console.error('Error:', error);
			response.send('Error: ' + error);
		});
});

// Serve static files from the "public" directory
app.use(express.static('./public'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
