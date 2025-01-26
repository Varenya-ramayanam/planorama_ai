import React from 'react'

const Hotels = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {trip.tripData?.hotel_options?.map((hotel, index) => (
                <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
                    <img src="https://media.istockphoto.com/id/2154569551/photo/plane-in-flight.jpg?s=1024x1024&w=is&k=20&c=gytV_e5uEO0tZJPfS6EK0qyKkqWCBJigmNpHvR5CNKo=" alt="" className='rounded-xl'/>
                    <div className='my-2 flex flex-col gap-2'>
                        <h2 className='font-medium'>{hotel?.hotel_name}</h2>
                        <h2 className='text-gray-500 text-xs'>📍{hotel.address}</h2>
                        <h2 className='text-sm'>💰{hotel?.price}</h2>
                        <h2 className='text-sm'>⭐{hotel?.rating}</h2>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Hotels