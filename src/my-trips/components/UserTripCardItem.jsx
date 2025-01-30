import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserTripCardItem = ({ trip }) => {
  const [placePhoto, setPlacePhoto] = useState(null);
  const location = trip?.userSelection?.location;

  useEffect(() => {
    if (location?.label) {
      getPlacePhoto();
    }
  }, [location]);

  const getPlacePhoto = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/place-photo", {
        params: { query: location.label },
      });

      console.log("API Response:", resp.data);
      setPlacePhoto(resp.data.photoUrl);
    } catch (error) {
      console.error("Failed to get place photo:", error);
    }
  };

  return (
    <Link to = {'/view-trip/' + trip.id} >
    <div className="bg-white p-5 rounded-xl shadow-md hover:scale-105 transition-all hover:shadow-md cursor-pointer">
      <img
        src={
          placePhoto
            ? placePhoto
            : "https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo=" // Default image
        }
        className="object-cover rounded-xl h-[200px] w-full"
        alt="Trip location"
      />
      <div className="mt-5">
        <h2 className="font-bold text-lg">{location?.label}</h2>
        <h2 className="text-sm text-gray-500">
          {trip?.userSelection?.days} day trip with {trip?.userSelection?.budget} budget
        </h2>
      </div>
    </div>
    </Link>
  );
};

export default UserTripCardItem;
