const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nosqldb = require('./server/routes/noSqlDb')

const app = express();

const watson = require('./server/routes/watson');

// Port Number
require('dotenv').config({
    silent: true
});
const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/watson', watson);

app.use('/db', nosqldb);
// Index Route
app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
});

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// });

// Start Server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});