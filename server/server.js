const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

let messages = [];
let summary = null;

app.use(cors());
app.use(express.json());

app.get('/messages', (req, res) => {
    res.json(messages);

    if(res.statusCode === 200) {
        console.log(`Messages retrieved: ${JSON.stringify(messages)}`);
    }
});

app.post('/messages', (req, res) => {
    const { role, text } = req.body;

    if (!role || !text) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    
    const newMessage = {
        role,
        text
    };

    messages.push(newMessage);
    res.status(201).json(newMessage);

    if(res.statusCode === 201) {
        console.log(`New message added: ${JSON.stringify(newMessage)}`);
    }
});


app.post('/summary', (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Summary text is required' });
    }

    summary = {
        text,
        timestamp: Date.now()
    };

    res.status(201).json(summary);

    console.log(`Resumen guardado: ${JSON.stringify(summary)}`);
});

app.get('/summary', (req, res) => {
    if (!summary) {
        return res.status(404).json({ error: 'No summary found' });
    }

    res.status(200).json(summary);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})