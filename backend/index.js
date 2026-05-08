const express = require('express');
const dotenv = require('dotenv');
const db = require('./lib/Dbconnection.js');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');

const { server, app } = require('./lib/socket.js');

dotenv.config();


const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.use(cookieParser());

db();

const userRoute = require('./routes/user.route.js');
const messageRoute = require('./routes/message.route.js');

app.use('/auth', userRoute);
app.use('/message', messageRoute);

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'frontend/dist')));
    app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});
}

server.listen(PORT, () => {
    console.log(`up and running at http://localhost:${PORT}`);
});