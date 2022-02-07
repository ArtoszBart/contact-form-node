const PORT = process.env.PORT || 3000;
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html');
});

app.post('/', (req, res) => {
	console.log(req.body);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASS
		},
		tls: {
			rejectUnauthorized: false
		}
	});
	const mailOptions = {
		from: req.body.email,
		to: process.env.EMAIL,
		subject: `Message from ${req.body.email}: ${req.body.subject}`,
		text: req.body.message
	};
	transporter.sendMail(mailOptions, (err, info) => {
		if (err) {
			console.log(err);
			res.send('error');
		} else {
			console.log('Email sent: ' + info.response);
			res.send('success');
		}
	});
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));