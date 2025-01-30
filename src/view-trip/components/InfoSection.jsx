import { Button } from "../../components/ui/button";
import { FaShareAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { Copy } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {toast} from "react-toastify";

const InfoSection = ({ trip }) => {
  const [placePhoto, setPlacePhoto] = useState(null);
  const [currentURL, setCurrentURL] = useState("");

  useEffect(() => {
    setCurrentURL(window.location.href); // Set the current page URL
  }, []);

  useEffect(() => {
    if (trip?.userSelection?.location?.label) {
      getPlacePhoto();
    }
  }, [trip]);

  const getPlacePhoto = async () => {
    try {
      const location = trip?.userSelection?.location?.label;
      const resp = await axios.get(`https://planorama-ai.onrender.com/api/place-details`, {
        params: { query: location },
      });

      console.log("API Response:", resp.data);
      setPlacePhoto(resp.data.photoUrl);
    } catch (error) {
      console.error("Failed to get place photo:", error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentURL);
    toast.success("Added link to the Clipboard!");
  };

  return (
    <div>
      <img
        className="h-[300px] w-full object-cover rounded-xl"
        src={
          placePhoto
            ? placePhoto
            : "https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo="
        }
        alt="Location"
      />

      <div className="my-5 flex flex-col gap-2">
        <h2 className="font-bold text-2xl">
          {trip?.userSelection?.location?.label || "Location not available"}
        </h2>
        <div className="flex justify-between items-center">
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              📅 {trip?.userSelection?.days} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💸 {trip?.userSelection?.budget} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🥂 No of travellers: {trip?.userSelection?.people}
            </h2>
          </div>

          {/* Share Button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <FaShareAlt />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Share link</DialogTitle>
                <DialogDescription>
                  Anyone who has this link will be able to view this.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center space-x-2">
                <div className="grid flex-1 gap-2">
                  <Label htmlFor="link" className="sr-only">
                    Link
                  </Label>
                  <Input id="link" value={currentURL} readOnly />
                </div>
                <Button onClick={handleCopyLink} size="sm" className="px-3">
                  <span className="sr-only">Copy</span>
                  <Copy />
                </Button>
              </div>
              <DialogFooter className="sm:justify-start">
                <DialogClose asChild>
                  <Button type="button">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
