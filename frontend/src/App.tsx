import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Trip from './pages/trip';
import Trips from './pages/trips';
import Navbar from './components/navbar';
import TripDetails from './pages/tripDetails';
import Login from './pages/login';
import ProtectedRoute from './services/ProtectedRoute';
import { AuthProvider } from './services/AuthProvider';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className='flex flex-col'>
          <header>
            <Navbar />
          </header>
          <main className='h-full p-4'>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/login' element={<Login />} />

              <Route element={<ProtectedRoute />} >
                <Route path="/trip" element={<Trip />} />
                <Route path="/trips" element={<Trips />} />
                <Route path='/trip/:id' element={<TripDetails />} />
              </Route>
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App
