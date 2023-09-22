const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Create a connection to your MySQL database
const db = mysql.createConnection({
    host: 'localhost',     // Replace with your MySQL host
    user: 'username',      // Replace with your MySQL username
    password: 'password',  // Replace with your MySQL password
    database: 'yourdb'     // Replace with your MySQL database name
});

// Connect to the database
db.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// Middleware to parse JSON requests
app.use(bodyParser.json());

// API endpoint to fetch a document by ID
app.get('/api/documents/:id', (req, res) => {
    const documentId = req.params.id;
    const query = 'SELECT content FROM documents WHERE id = ?';

    db.query(query, [documentId], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error fetching document' });
            return;
        }

        if (results.length === 0) {
            res.status(404).json({ error: 'Document not found' });
        } else {
            const documentContent = results[0].content;
            res.status(200).json({ content: documentContent });
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
