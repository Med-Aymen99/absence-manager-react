import React from 'react';
import AbsenceManager from './pages/AbsenceManager';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
export default function App() {

  return(
    <div>
      <Navbar />
      <AbsenceManager />
      <Footer />
    </div>
  )
  
}