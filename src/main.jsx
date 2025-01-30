
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Trip from './create-trip'
import Header from './components/custom/Header'
import { ToastContainer } from 'react-toastify'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view-trip/[tripId]'
import MyTrips from './my-trips'

createRoot(document.getElementById('root')).render(

<BrowserRouter>
<ToastContainer/>
<GoogleOAuthProvider clientId={import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID}>
  <Header/>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path='/create-trip' element={<Trip/>}></Route>
    <Route path='/view-trip/:tripId' element={<ViewTrip/>}></Route>
    <Route path='/my-trips' element={<MyTrips/>}></Route>
  </Routes>
  </GoogleOAuthProvider>
  </BrowserRouter>
)
