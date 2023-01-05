const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const cors = require('cors');
const multer = require('multer');
const { protect } = require('./middleware/authMiddleware');

connectDB();

const app = express();
// app.use(express.static('/uploads', 'server/uploads'))

// upload
const storage = multer.diskStorage({
	destination: (err, file, cb) => {
		cb(null, __dirname + '/uploads');
	},
	filename: (req, file, cb) => {
		console.log(req.user.email);
		cb(null, `${req.user.email}.jpg`);
	},
});

const uploads = multer({ storage });

app.post('/api/uploads', protect, uploads.single('image'), (req, res) => {
	res.json({
		url: `/uploads/${req.file.originalname}`,
	});
});

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/favoriteColors', require('./routes/favoriteColorRoutes'));
app.use('/api/favoriteSchemes', require('./routes/favoriteSchemeRoutes'));
app.use('/api/history', require('./routes/historyRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) =>
		res.sendFile(
			path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
		)
	);
} else {
	app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

module.exports = app;
