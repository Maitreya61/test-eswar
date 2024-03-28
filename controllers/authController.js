const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/database.db');

exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to hash password' });
        }

        const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
        db.run(query, [username, email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to register user' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.loginUser = (req, res) => {
    const { username, password } = req.body;

    const query = 'SELECT * FROM users WHERE username = ?';
    db.get(query, [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to authenticate' });
        }
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to authenticate' });
            }
            if (!result) {
                return res.status(401).json({ error: 'Invalid password' });
            }

            const token = jwt.sign({ username: user.username, email: user.email }, 'secretkey');
            res.status(200).json({ token });
        });
    });
};
