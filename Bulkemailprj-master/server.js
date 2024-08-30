const express = require('express');
const multer = require('multer');
const xlsx = require('xlsx');
const axios = require('axios');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const routes = require('./routes');
app.use('/', routes);

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
