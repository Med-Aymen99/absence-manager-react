import React from 'react';
import AbsenceManager from './pages/AbsenceManager';
import Navbar from './components/NavBar';

export default function App() {

  return(
    <div>
      <Navbar />
      <AbsenceManager className='absence-manager' />
    </div>
  )
  
}