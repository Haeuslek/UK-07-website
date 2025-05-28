const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Statische Dateien bereitstellen (HTML, CSS, JS, Bilder)
app.use(express.static(path.join(__dirname)));

// Root-Route zeigt index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// MySQL-Verbindung
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'UK07',
    port: 3306
});

db.connect(err => {
    if (err) throw err;
    console.log('🟢 MySQL verbunden!');
});

// API-Route
app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    if (!name || !message) {
        return res.status(400).send('Name und Nachricht sind erforderlich.');
    }

    const sql = 'INSERT INTO submissions (name, message) VALUES (?, ?)';
    db.query(sql, [name, message], (err) => {
        if (err) {
            console.error('❌ Fehler beim Einfügen:', err);
            return res.status(500).send('Fehler beim Speichern.');
        }
    });
});

app.get('/random', (req, res) => {
    const sql = 'SELECT * FROM submissions ORDER BY RAND() LIMIT 1';
    db.query(sql, (err, results) => {
        if (err) return res.status(500).send('Fehler beim Abrufen.');
        if (results.length === 0) return res.status(404).send('Keine Einträge vorhanden.');
        res.json(results[0]); // enthält: id, name, message, likes, dislikes
    });
});



app.listen(port, () => {
    console.log(`🚀 Server läuft auf http://localhost:${port}`);
});

app.post('/like', (req, res) => {
    const { message } = req.body;
    const sql = 'UPDATE submissions SET likes = likes + 1 WHERE message = ?';
    db.query(sql, [message], (err, result) => {
        if (err) {
            console.error('❌ Fehler beim Liken:', err);
            return res.status(500).send('Fehler beim Liken.');
        }
        res.send('👍 Like gespeichert');
    });
});

app.post('/dislike', (req, res) => {
    const { message } = req.body;
    const sql = 'UPDATE submissions SET dislikes = dislikes + 1 WHERE message = ?';
    db.query(sql, [message], (err, result) => {
        if (err) {
            console.error('❌ Fehler beim Disliken:', err);
            return res.status(500).send('Fehler beim Disliken.');
        }
        res.send('👎 Dislike gespeichert');
    });
});

