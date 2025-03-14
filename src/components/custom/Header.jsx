import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { googleLogout } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "../ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { GiPlanetConquest } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import axios from "axios";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      console.log("user", user);
    } else {
      console.log("no user");
    }
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
        },
      })
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        toast.error("Failed to fetch user details. Please try again!");
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between items-center px-5">
      <div
        className="flex items-center gap-1 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <GiPlanetConquest style={{ fontSize: "50px", color: "#f56551" }} />
        <h1 className="font-bold text-3xl">Planorama</h1>
      </div>

      <div className="lg:hidden">
        {isMobileMenuOpen ? (
          <HiX className="w-8 h-8" onClick={() => setIsMobileMenuOpen(false)} />
        ) : (
          <HiMenu
            className="w-8 h-8"
            onClick={() => setIsMobileMenuOpen(true)}
          />
        )}
      </div>

      <div className="hidden lg:flex items-center gap-3">
        {user ? (
          <>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/create-trip")}
            >
              + Create Trip
            </Button>
            <Button
              variant="outline"
              className="rounded-full"
              onClick={() => navigate("/my-trips")}
            >
              My trips
            </Button>
            <Popover>
              <PopoverTrigger>
                <img
                  src={user.picture}
                  className="h-[35px] w-[35px] rounded-full"
                />
              </PopoverTrigger>
              <PopoverContent>
                <h2
                  onClick={() => {
                    googleLogout();
                    localStorage.removeItem("user");
                    navigate("/");
                  }}
                  className="cursor-pointer"
                >
                  Logout
                </h2>
              </PopoverContent>
            </Popover>
          </>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Signin</Button>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="absolute top-14 right-0 w-2/3 h-full bg-white shadow-lg z-10 flex flex-col items-start p-4 lg:hidden">
          {user ? (
            <>
              <Button
                variant="outline"
                className="rounded-full mb-3"
                onClick={() => navigate("/create-trip")}
              >
                + Create Trip
              </Button>
              <Button
                variant="outline"
                className="rounded-full mb-3"
                onClick={() => navigate("/my-trips")}
              >
                My trips
              </Button>
              <h2
                onClick={() => {
                  googleLogout();
                  localStorage.removeItem("user");
                  navigate("/");
                  setIsMobileMenuOpen(false);
                }}
                className="cursor-pointer"
              >
                Logout
              </h2>
            </>
          ) : (
            <Button
              onClick={() => {
                setOpenDialog(true);
                setIsMobileMenuOpen(false);
              }}
            >
              Signin
            </Button>
          )}
        </div>
      )}

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <div className="flex flex-col items-center">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <GiPlanetConquest
                    style={{ fontSize: "50px", color: "#f56551" }}
                  />
                  <h1 className="font-bold text-3xl">Planorama</h1>
                </div>
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

export default Header;
