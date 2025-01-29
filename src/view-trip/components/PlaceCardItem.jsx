import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${place.place_name}`}
      target="_blank"
      rel="noreferrer"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer">
        <img
          src="https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo="
          className="w-[130px] h-[130px] rounded-xl"
        />
        <div>
          <h2 className="font-bold text-lg">{place.place_name}</h2>
          <p className="text-sm text-gray-400">{place.place_details}</p>
          <h2 className="mt-2">🚌{place.travel_time}</h2>
          <Button size="sm" className="mt-2">
            <FaMapLocationDot />
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
