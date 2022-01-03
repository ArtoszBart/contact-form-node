const PORT = 5000;
const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));