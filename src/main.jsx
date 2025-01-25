
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import Trip from './create-trip'
import Header from './components/custom/Header'



createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Header/>
  <Routes>
    <Route path="/" element={<App />}/>
    <Route path='/create-trip' element={<Trip/>}></Route>
  </Routes>
  </BrowserRouter>
)
