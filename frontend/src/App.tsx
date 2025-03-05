import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './pages/home';
import Trip from './pages/trip';
import Trips from './pages/trips';
import Navbar from './components/navbar';

function App() {
  return (
    <BrowserRouter>
      <div className='flex flex-col'>
        <header>
          <Navbar />
        </header>
        <main className='h-full p-4'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/trips" element={<Trips />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
