import { useLoadScript } from "@react-google-maps/api";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import {
  selectBudgetOptions,
  SelecetTravelOptions,
  AI_PROMPT,
} from "../constants/options";
import { toast } from "react-toastify";
import { chatSession } from "../service/AIMODEL";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../service/firebaseconfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const libraries = ["places"]; // Static declaration outside the component

const Trip = () => {
  const apikey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY; // Access the API key
  const [place, setPlace] = useState(null); // State to store the selected place
  const [formData, setFormData] = useState({}); // State to store the form data
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "days" && value > 5) {
      toast.error("You can't plan a trip for more than 5 days!");
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

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {

    const user = localStorage.getItem("user");

    if (!user) {
      toast.error("Please login to generate a trip!");
      setOpenDialog(true);
      return;
    }

    if (formData.days > 5) {
      toast.error("Please fill in all the details to generate a trip!");
      return;
    }
    if (!formData?.location || !formData?.budget || !formData?.people) {
      toast.error("Please fill in all the details to generate a trip!");
      return;
    }

    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace(
      "{location}",
      formData.location.label
    )
      .replace("{days}", formData.days)
      .replace("{people}", formData.people)
      .replace("{budget}", formData.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log(result?.response?.text());
    setLoading(false);
    saveAITrip(result?.response?.text());

  };

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
        },
      })
      .then((res) => {
        console.log(res.data); // Contains user details like email, name, picture
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        toast.error("Failed to fetch user details. Please try again!");
      });
  };

  const saveAITrip = async (tripData) => {
    
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail : user.email,
      id: docId
    });
    setLoading(false);
    navigate(`/view-trip/${docId}`);
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
            // max={5} // Restricting input to a maximum of 5 days
            onChange={(e) => handleInputChange("days", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
          <div className="grid grid-cols-3 mt-5 gap-5">
            {selectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${
                  formData?.budget === item.title && "shadow-lg border-black"
                }`}
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
                  ${
                    formData?.people === item.people && `shadow-lg border-black`
                  }  
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
      <Button disabled={loading} onClick={onGenerateTrip}>
  {loading ? (
    <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
  ) : (
    'Generate trip'
  )}
</Button>

      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <img src="/logo.svg" alt="Logo" className="mb-5" />
                <h2 className="font-bold text-lg mt-2">Sign in with Google</h2>
                <p className="text-sm text-gray-600 mt-2">
                  Sign in to the app using Google!
                </p>
                <Button
                  className="w-full mt-5 flex gap-3 items-center justify-center"
                  onClick={login}
                >
                  <FcGoogle className="h-6 w-6" />
                  Sign in with Google
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Trip;
