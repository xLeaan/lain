const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let messages = [];

app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.post('/messages', (req, res) => {
    const { role, text, timestamp } = req.body;

    if (!role || !text || !timestamp) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newMessage = {
        role,
        text,
        timestap
    };

    messages.push(newMessage);
    res.status(201).json(newMessage);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})