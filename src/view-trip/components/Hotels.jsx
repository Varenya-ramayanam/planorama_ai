import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

const Hotels = ({trip}) => {
  return (
    <div>
        <h2 className='font-bold text-xl mt-5'>Hotel Recommendations</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5 mb-5'>
            {trip.tripData?.hotel_options?.map((hotel, index) => (
                <HotelCardItem key = {index} hotel={hotel}/>
            ))}
        </div>
    </div>
  )
}

export default Hotels


