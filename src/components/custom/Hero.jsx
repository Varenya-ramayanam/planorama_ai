import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-4 sm:mx-12 md:mx-24 lg:mx-56 gap-9 lg:mt-16 sm:mt-9">
      <h2 className="font-extrabold text-[40px] sm:text-[50px] md:text-[60px] text-center mt-16">
        <span className="text-[#f56551]">
          Discover your Next Adventure with AI:
        </span>{" "}
        Personalized Itineraries at your Fingertips
      </h2>
      <p className="text-lg sm:text-xl md:text-2xl text-gray-500 text-center">
        Crafting personalized travel itineraries that turn your dream
        destinations into unforgettable journeys, one step at a time!
      </p>
      <Link to={"/create-trip"}>
        <Button className="mt-4">Get Started, It is Free!</Button>
      </Link>
    </div>
  );
};

export default Hero;
