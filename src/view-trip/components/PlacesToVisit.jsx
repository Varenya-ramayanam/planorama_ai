import React from "react";
import PlaceCardItem from "./PlaceCardItem";
const PlacesToVisit = ({ trip }) => {
  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>

      <div>
        {trip.tripData?.itinerary
          ? Object.entries(trip.tripData.itinerary).map(
              ([day, details], index) => (
                <div key={index} className="mt-5">
                  <h2 className="font-medium text-lg">{`Day ${index + 1}`}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {details.activities?.map((activity, i) => (
                      <div key={i} className="mt-5">
                        <h2 className="font-medium text-sm text-orange-600">
                          {activity.scheduled_time}
                        </h2>
                        <PlaceCardItem place={activity} />
                      </div>
                    ))}
                  </div>
                </div>
              )
            )
          : "No itinerary available."}
      </div>
    </div>
  );
};

export default PlacesToVisit;
