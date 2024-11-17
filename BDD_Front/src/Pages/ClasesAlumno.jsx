import React, { useState } from "react";
import "./ClasesAlumno.css";
import Navbar from "../Components/Navbar";

const ClasesAlumno = () => {
  const [ciAlumno, setCiAlumno] = useState("");
  const [clases, setClases] = useState([]); 
  const [error, setError] = useState(""); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); 
    setClases([]); 

    if (!ciAlumno) {
      setError("Por favor ingresa una cédula válida.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8000/clases_alumno/${ciAlumno}`);
      if (response.ok) {
        const data = await response.json();
        setClases(data.clases_inscriptas);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error al obtener las clases.");
      }
    } catch (err) {
      setError("Error al conectar con el servidor.");
    }
  };

  return (
    <div>
        <Navbar/>
        <div className="clases-alumno-container">
      <h1>Buscar Clases Inscritas</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          value={ciAlumno}
          onChange={(e) => setCiAlumno(e.target.value)}
          placeholder="Ingresa tu cédula"
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Buscar
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      <div className="cards-container">
        {clases.length > 0 ? (
          clases.map((clase) => (
            <div key={clase.id_clase} className="card">
              <h2>{clase.nombre_actividad}</h2>
              <p>
                <strong>Instructor:</strong> {clase.nombre_instructor}
              </p>
              <p>
                <strong>Horario:</strong> {clase.hora_inicio} - {clase.hora_fin}
              </p>
            </div>
          ))
        ) : !error && ciAlumno ? (
          <p>No hay clases inscritas para esta cédula.</p>
        ) : null}
      </div>
    </div>
    </div>
  );
};

export default ClasesAlumno;
