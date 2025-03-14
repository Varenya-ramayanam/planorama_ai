import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { GiCompass, GiCommercialAirplane, GiReceiveMoney } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-yellow-100 flex flex-col justify-center items-center text-center p-6">
      {/* Main Heading */}
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#f56551] mb-4"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Welcome to Planorama!
      </motion.h1>

      {/* Subheading */}
      <motion.p
        className="text-base sm:text-lg md:text-xl text-gray-700 mb-8 max-w-xl"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Your ultimate travel planner. Discover, Plan, and Share your journeys with the world!
      </motion.p>

      {/* Features */}
      <motion.div
        className="flex flex-col sm:flex-row gap-10 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
        }}
      >
        {/* Feature 1 */}
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.1 }}
        >
          <GiCompass className="text-5xl sm:text-6xl text-[#f56551]" />
          <h3 className="text-lg sm:text-xl font-semibold mt-2">Explore Destinations</h3>
          <p className="text-sm text-gray-600 text-center">Find the best travel spots and create your own unique itinerary.</p>
        </motion.div>

        {/* Feature 2 */}
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.1 }}
        >
          <GiCommercialAirplane className="text-5xl sm:text-6xl text-[#f56551]" />
          <h3 className="text-lg sm:text-xl font-semibold mt-2">Plan Your Trip</h3>
          <p className="text-sm text-gray-600 text-center">Customize your journey with day-by-day plans and budget management.</p>
        </motion.div>

        {/* Feature 3 */}
        <motion.div
          className="flex flex-col items-center"
          whileHover={{ scale: 1.1 }}
        >
          <GiReceiveMoney className="text-5xl sm:text-6xl text-[#f56551]" />
          <h3 className="text-lg sm:text-xl font-semibold mt-2">Share & Collaborate</h3>
          <p className="text-sm text-gray-600 text-center">Share your travel experiences and get feedback from the community.</p>
        </motion.div>
      </motion.div>

      {/* Call to Action Button */}
      <motion.div
        className="mt-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Button
          className="bg-[#f56551] text-white px-6 py-3 rounded-full text-lg hover:bg-[#d95341]"
          onClick={() => navigate("/create-trip")}
        >
          Start Planning
        </Button>
      </motion.div>
    </div>
  );
};

export default Hero;
