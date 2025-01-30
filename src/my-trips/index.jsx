import { query, collection, where, getDocs } from "firebase/firestore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../service/firebaseconfig";
import { useState } from "react";
import UserTripCardItem from "./components/UserTripCardItem";

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }
    
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips((prev) => [...prev, { ...doc.data() }]);
    });
  };
  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
        <h2 className="font-bold text-3xl">My trips</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mt-5">
            {userTrips.length>0? userTrips.map((trip) => (
                <UserTripCardItem key={trip.id} trip={trip}/>
            ))
            :[1,2,3,4,5,6].map((item,index) => (
                <div key={index} className="h-[250px] w-full bg-slate-200 animate-pulse rounded-xl">
                    
                </div>
            ))
        }
        </div>
    </div>
  )
};

export default MyTrips;
