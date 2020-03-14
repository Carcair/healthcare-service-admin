const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// 
const employees = require('./routes/api/employees');

app.use('/api/employees', employees);

// Port variable
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running at port ${port}`));