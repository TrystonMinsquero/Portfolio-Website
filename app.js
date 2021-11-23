// imports - must use EcmaScript syntax
const express = require('express');
const { url } = require('inspector');
const path = require('path')

// initalize app
const app = express();
const PORT = process.env.PORT || 5000;

// set public folder as static
app.use(express.static(path.join(__dirname, 'static')));

// access public files for CSS, JS, Favicons, and Images
app.use('/css', express.static(path.join(__dirname, 'static/css')));
app.use('/img', express.static(path.join(__dirname, 'static/img')));

// routing
app.use(express.urlencoded({ extended: false }));
app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/home.html'));
});

app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`));
