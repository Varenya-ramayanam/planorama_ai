const express = require("express");
const cors = require("cors");
require("dotenv").config();
const placesRoutes = require("./routes/places");

const app = express();

app.use(cors());
app.use(express.json());

// Use the places API route
app.use("/api", placesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
