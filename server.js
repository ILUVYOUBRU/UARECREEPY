const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Path to the JSON file where images will be stored
const databaseFilePath = './imageDatabase.json';

// Load the image database from file (or initialize it if it doesn't exist)
let imageDatabase = [];
if (fs.existsSync(databaseFilePath)) {
    imageDatabase = JSON.parse(fs.readFileSync(databaseFilePath, 'utf8'));
}

// Function to save the database to file
function saveDatabase() {
    fs.writeFileSync(databaseFilePath, JSON.stringify(imageDatabase, null, 2), 'utf8');
}

// Endpoint to save the image with a timestamp
app.post('/save-image', (req, res) => {
    const { image, timestamp } = req.body;
    
    // Add the image and its timestamp to the database
    imageDatabase.push({ image, timestamp });
    
    // Save the updated database to the file
    saveDatabase();

    res.json({ message: 'Image saved', timestamp });
});

// Endpoint to get all images
app.get('/get-images', (req, res) => {
    res.json(imageDatabase);  // Return all stored images and timestamps
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
