const express = require("express");
const axios = require("axios");
require("dotenv").config();

const router = express.Router();
const GOOGLE_PLACES_URL = "https://maps.googleapis.com/maps/api/place/textsearch/json";
const GOOGLE_PHOTO_URL = "https://maps.googleapis.com/maps/api/place/photo";

const API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Load API key from .env

// Route to fetch hotel photo by name (hotel-photo endpoint)
router.get("/hotel-photo", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Hotel name is required" });
  }

  try {
    // Request to Google Places API to get hotel details
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: {
        query: query,
        key: API_KEY,
      },
    });

    const placeData = response.data;
    let photoUrl = null;

    if (placeData.results?.length > 0 && placeData.results[0].photos?.length > 0) {
      const photoReference = placeData.results[0].photos[0].photo_reference;
      // Construct photo URL
      photoUrl = `${GOOGLE_PHOTO_URL}?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
    } else {
      // Fallback if no photo is available
      photoUrl = "https://example.com/default-hotel-photo.jpg"; // Replace with a default image URL
    }

    res.json({
      photoUrl, // Return the photo URL or fallback image
    });

  } catch (error) {
    console.error("Error fetching hotel photo:", error);
    res.status(500).json({ error: "Failed to fetch hotel photo" });
  }
});

// Route to fetch place details (place-details endpoint)
router.get("/place-details", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing place query" });
  }

  try {
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: {
        query,
        key: API_KEY,
      },
    });

    const placeData = response.data;
    let photoUrl = null;

    if (placeData.results?.length > 0 && placeData.results[0].photos?.length > 0) {
      const photoReference = placeData.results[0].photos[0].photo_reference;
      photoUrl = `${GOOGLE_PHOTO_URL}?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
    }

    res.json({
      placeName: placeData.results?.[0]?.name || "Unknown",
      placeDetails: placeData.results?.[0]?.formatted_address || "Address not available",
      photoUrl: photoUrl, // Return the place name, address, and photo URL
    });

  } catch (error) {
    console.error("Error fetching place details:", error);
    res.status(500).json({ error: "Failed to fetch place details" });
  }
});

// Route to fetch place photo by name (place-photo endpoint)
router.get("/place-photo", async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Place name is required" });
  }

  try {
    // Request to Google Places API to get place details
    const response = await axios.get(GOOGLE_PLACES_URL, {
      params: {
        query: query,
        key: API_KEY,
      },
    });

    const placeData = response.data;
    let photoUrl = null;

    if (placeData.results?.length > 0 && placeData.results[0].photos?.length > 0) {
      const photoReference = placeData.results[0].photos[0].photo_reference;
      // Construct photo URL
      photoUrl = `${GOOGLE_PHOTO_URL}?maxwidth=400&photo_reference=${photoReference}&key=${API_KEY}`;
    } else {
      // Fallback if no photo is available
      photoUrl = "https://example.com/default-place-photo.jpg"; // Replace with a default image URL
    }

    res.json({
      photoUrl, // Return the photo URL or fallback image
    });

  } catch (error) {
    console.error("Error fetching place photo:", error);
    res.status(500).json({ error: "Failed to fetch place photo" });
  }
});

module.exports = router;
