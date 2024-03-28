const express = require('express');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const authRoutes = require('./routes/auth');
const dataRoutes = require('./routes/data');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

// Create users table if it doesn't exist
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, email TEXT, password TEXT)");
});

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/data', dataRoutes);

const swaggerDocument = YAML.load('./swagger/swagger.yaml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/api-docs');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
