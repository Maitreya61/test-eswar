const express = require('express');
const YAML = require('yamljs');
const mongoose = require("mongoose");
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const path = require('path');
require('dotenv').config();

// Create users table if it doesn't exist


const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("Connected to database"))

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
