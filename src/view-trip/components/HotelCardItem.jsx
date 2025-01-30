import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const HotelCardItem = ({ hotel }) => {
  const [hotelPhoto, setHotelPhoto] = useState(null);

  useEffect(() => {
    if (hotel?.hotel_name) {
      getHotelPhoto();
    }
  }, [hotel]);

  const getHotelPhoto = async () => {
    try {
      const resp = await axios.get("http://localhost:5000/api/hotel-photo", {
        params: { query: hotel.hotel_name },
      });
      
      console.log("API Response:", resp.data);
      setHotelPhoto(resp.data.photoUrl);
    } catch (error) {
      console.error("Failed to get hotel photo:", error);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotel_name},${hotel.address}`}
      target="_blank"
      rel="noreferrer"
      className="hover:scale-105 transition-all cursor-pointer"
    >
      <div className="hover:scale-105 transition-all cursor-pointer border rounded-xl p-3 w-[260px] h-[370px]">
        <img
          src={
            hotelPhoto
              ? hotelPhoto
              : "https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo="
          }
          alt={hotel?.hotel_name || "Hotel Image"}
          className="rounded-xl w-full h-48 object-cover"
        />
        <div className="my-2 flex flex-col gap-2">
          <h2 className="font-medium">{hotel?.hotel_name}</h2>
          <h2 className="text-gray-500 text-xs">📍 {hotel.address}</h2>
          <h2 className="text-sm">💰 {hotel?.price}</h2>
          <h2 className="text-sm">⭐ {hotel?.rating}</h2>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
