const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Import routes
const employees = require('./routes/api/employees');
const teams = require('./routes/api/teams');

// Redirecting routes
app.use('/api/employees', employees);
app.use('/api/teams', teams);

// Port variable
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port ${port}`));