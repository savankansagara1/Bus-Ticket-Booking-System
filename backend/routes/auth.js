const express = require('express');
const router = express.Router();
const users = require('../data/users');

// POST /auth/login
// Purpose: Authenticate user and return user details
router.post('/login', (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = users.find(u => u.username === username && u.password === password);

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Return user without password
        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /auth/register
// Purpose: Register a new user
router.post('/register', (req, res) => {
    try {
        const { username, password, name } = req.body;

        if (!username || !password || !name) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Check if user already exists
        if (users.find(u => u.username === username)) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create new user
        const newUser = {
            id: `user${users.length + 1}`,
            username,
            password,
            name
        };

        users.push(newUser);

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser;
        res.json({ success: true, user: userWithoutPassword });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
