import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';



function App() {


  return (
    <>
      <div>
        <h1>PAGINA PRINCIPAL</h1>
    <Router>
      <Routes>
        <Route path="/" element={<RegisterForm />} />
      </Routes>
    </Router>
      </div>
    </>
  )
}

export default App
