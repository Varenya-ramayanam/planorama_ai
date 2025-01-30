const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const placesRoutes = require("./routes/places");

const app = express();

app.use(cors());
app.use(express.json());

// Use the places API route
app.use("/api", placesRoutes);

const PORT = process.env.PORT ;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  