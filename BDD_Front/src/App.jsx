import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterForm from './Components/RegisterForm';
import LoginForm from './Components/LoginForm';
import Home from './Pages/Home';
import HomeClases from './Pages/HomeClases';
import ClasesAlumno from './Pages/ClasesAlumno';
import ListActividades from './Pages/ActividadesAdmin';
import UpdateActividad from './Pages/ActualizarActividad,';
import ActividadesPage from './Pages/AgregarActividades';
import ClaseForm from './Pages/ClasesForm';
import PrivateRoute from './PrivateRoute'
import ActividadesPopulares from './Pages/ActividadesPopulares'
import TurnosClases from './Pages/TurnosClases'
const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.type === "admin"; 
};

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
        <Route
        path="/editaradmin"
        element={
            <PrivateRoute isAllowed={isAdmin()}>
                <ListActividades />
            </PrivateRoute>
        }
    />
    <Route
        path="/actividades/editar/:id_actividad"
        element={
            <PrivateRoute isAllowed={isAdmin()}>
                <UpdateActividad />
            </PrivateRoute>
        }
    />
    <Route
        path="/adminactividades"
        element={
            <PrivateRoute isAllowed={isAdmin()}>
                <ActividadesPage />
            </PrivateRoute>
        }
    />
    <Route
        path="/agregarclase"
        element={
            <PrivateRoute isAllowed={isAdmin()}>
                <ClaseForm />
            </PrivateRoute>
        }
    />
        <Route
        path="/actividades/populares"
        element={
            <PrivateRoute isAllowed={isAdmin()}>
                <ActividadesPopulares />
            </PrivateRoute>
        }
    />

      <Route
        path="/turnos/clases"
        element={
            <PrivateRoute isAllowed={isAdmin()}>
                <TurnosClases />
            </PrivateRoute>
        }
    />
      </Routes>
    </Router>
      </div>
    </>
  )
}

export default App
