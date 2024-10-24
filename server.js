// server.js

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// In-memory "database" to store images (you can replace this with an actual database)
let imageDatabase = [];

// Endpoint to save the image
app.post('/save-image', (req, res) => {
    const imageData = req.body.image;  // The base64 image string
    imageDatabase.push(imageData);     // Save the image in the "database"
    res.json({ message: 'Image saved' });
});

// Endpoint to get all images
app.get('/get-images', (req, res) => {
    res.json(imageDatabase);  // Return all stored images
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
