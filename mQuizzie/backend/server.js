const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errorMiddleware } = require('./utils/ErrorHandler');
const userRoutes = require('./routes/userRoute');
const quizRoutes = require('./routes/quizRoute');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cookieParser());

// Configure CORS
const corsOptions = {
    origin: 'https://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Server is working fine',
    });
});

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/quiz', quizRoutes);

app.use(errorMiddleware);
app.all('*', (req, res, next) => {
    res.status(404).json({ errorMessage: 'Route not found!' });
});

app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).json({ errorMessage: 'Something went wrong!' });
});
;

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log('DB Connected!'))
    .catch((error) => console.log('DB failed to connect', error));

const PORT=4000;
app.listen(process.env.PORT, () => {
    console.log(`Backend server running at port ${PORT}`);
});
