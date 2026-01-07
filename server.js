const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory data storage
const users = [];

// Routes
app.post('/register', (req, res) => {
    const { fullName, email, password, course } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    // Basic duplicate check
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        return res.status(409).json({ success: false, message: 'Email already registered.' });
    }

    const newUser = {
        id: Date.now(),
        fullName,
        email,
        password, // In a real app, hash this!
        course: course || 'Not Specified',
        registeredAt: new Date()
    };

    users.push(newUser);
    console.log('New User Registered:', newUser);

    res.status(201).json({ success: true, message: 'Registration successful!', user: newUser });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
