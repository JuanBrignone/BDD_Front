import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Home from './Pages/Home';
import HomeClases from './Pages/HomeClases';
import Navbar from './Components/Navbar';
import ClasesAlumno from './Pages/ClasesAlumno';



function App() {


  return (
    <>
      <div>
        <h1>ESCUELA DE DEPORTES</h1>
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/clases" element={<HomeClases />} />
        <Route path="/clases_alumno" element={<ClasesAlumno />} />
      </Routes>
    </Router>
      </div>
    </>
  )
}

export default App
