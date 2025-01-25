import { Button } from "../ui/button"
import { Link } from 'react-router-dom'

const Hero = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9 mt-16">
      <h2 className="font-extrabold text-[60px] text-center mt-16">
      <span className="text-[#f56551]">Discover your Next Adventure with AI:</span> Personalized Itineraries at your Fingertips</h2>
      <p className="text-xl text-gray-500 text-center">Crafting personalized travel itineraries that turn your dream destinations into unforgettable journeys, one step at a time!</p>
      <Link to={'/create-trip'}>
        <Button>Get Started, It is Free!</Button>
        </Link>
    </div>
  )
}

export default Hero