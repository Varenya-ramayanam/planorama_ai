import { useLoadScript } from "@react-google-maps/api";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  selectBudgetOptions,
  SelecetTravelOptions,
} from "../constants/options";

const libraries = ["places"]; // Static declaration outside the component

const Trip = () => {
  const apikey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY; // Access the API key
  const [place, setPlace] = useState(null); // State to store the selected place

  const [formData, setFormData] = useState({}); // State to store the form data

  const handleInputChange = (name, value) => {
    // Restricting days to a maximum of 5
    if (name === "days" && value > 5) {
      alert("You can only plan a trip for a maximum of 5 days");
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const onGenerateTrip = () => {
    if (formData.days > 5) {
      return;
    }
    console.log("Trip generated", formData);
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apikey,
    libraries, // Use the static array
  });

  if (loadError) {
    return <div>Error loading Google Maps API: {loadError.message}</div>;
  }

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">
        Tell us your travelling preference!🏕️🌴
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Please provide us with some basic information, and our trip planner
        gives you the best itinerary!
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-medium">
            What is the destination of choice?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={apikey} // Pass the API key here
            selectProps={{
              place,
              onChange: (value) => {
                setPlace(value);
                handleInputChange("location", value);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder={"Ex-3"}
            type="number"
            max={5} // Restricting input to a maximum of 5 days
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${formData?.budget === item.title && "shadow-lg border-black"}`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl my-3 font-medium">
            Who do you plan to travel with in your next adventure?
          </h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {SelecetTravelOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer
                  ${formData?.people === item.people && `shadow-lg border-black`}  
                `}
                onClick={() => handleInputChange("people", item.people)}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip}>
          Generate trip
        </Button>
      </div>
    </div>
  );
};

export default Trip;