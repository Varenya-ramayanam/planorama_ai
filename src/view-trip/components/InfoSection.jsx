import { Button } from "../../components/ui/button";
import { FaShareAlt } from "react-icons/fa";
import { GetPlaceDetails } from "../../service/GloabalApi";
import { useEffect, useState } from "react";

const InfoSection = ({ trip }) => {
  const [placePhoto, setPlacePhoto] = useState(null); // To store the fetched photo

  const data = {
    textQuery: trip?.userSelection?.location?.label,
  };

  useEffect(() => {
    if (trip) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    try {
      const resp = await GetPlaceDetails(data); // Pass data to the GetPlaceDetails function
      console.log(resp); // Log the response to check the data structure
      setPlacePhoto(resp?.photos?.[0]?.photoReference); // Example: Set the photoReference if available
    } catch (error) {
      console.error("Failed to get place photo:", error);
    }
  };

  return (
    <div>
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={placePhoto ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${placePhoto}&key=${import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY}` : "https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo="}
        alt="Location"
      />

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label || "Location not available"}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅{trip.userSelection?.days} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💸{trip.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No of travellers: {trip.userSelection?.people}
            </h2>
          </div>
          <Button><FaShareAlt /></Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
