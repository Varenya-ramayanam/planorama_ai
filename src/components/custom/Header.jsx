import { Button } from "../ui/button";
import { useEffect } from "react";
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
import { useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import {toast} from "react-toastify";
import axios from "axios";

const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
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
        console.log(res.data); // Contains user details like email, name, picture
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error fetching user details:", err);
        toast.error("Failed to fetch user details. Please try again!");
      });
  };

  return (
    <div className="p-2 shadow-sm flex justify-between px-5 items-center">
      <img src="/logo.svg" alt="" />
      {user ? (
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-full">
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
        </div>
      ) : (
        <Button onClick={() => setOpenDialog(true)}>Signin</Button>
      )}

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

export default Header;
