import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PlaceCardItem = ({ place }) => {
  const [placePhoto, setPlacePhoto] = useState(null);

  useEffect(() => {
    if (place?.place_name) {
      getPlacePhoto();
    }
  }, [place]);

  const getPlacePhoto = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/place-photo", {
        params: { query: place.place_name },
      });

      console.log("API Response:", resp.data);
      setPlacePhoto(resp.data.photoUrl);
    } catch (error) {
      console.error("Failed to get place photo:", error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.place_name}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="border rounded-xl p-3 flex flex-col gap-3 hover:scale-105 transition-all hover:shadow-md cursor-pointer w-[260px] h-[300px]">
        <img
          src={
            placePhoto
              ? placePhoto
              : "https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo=" // Default image
          }
          alt={place?.place_name || "Place Image"}
          className="w-full h-[120px] rounded-xl object-cover"
        />
        <div className="flex flex-col justify-between flex-grow">
          <h2 className="font-bold text-md truncate">{place.place_name}</h2>
          <p className="text-xs text-gray-400 truncate">{place.place_details}</p>
          <h2 className="text-sm">🚌 {place.travel_time}</h2>
          <Button size="sm" className="mt-1">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
