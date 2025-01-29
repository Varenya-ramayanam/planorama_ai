const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 5000; // You can change the port if needed

app.use(cors());
app.use(express.json());

app.get('/api/places', async (req, res) => {
    try {
        const { query } = req.query;
        const API_KEY = process.env.GOOGLE_PLACE_API_KEY; // Read from .env

        const response = await axios.get(
            'https://maps.googleapis.com/maps/api/place/textsearch/json',
            { params: { query, key: API_KEY } }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
