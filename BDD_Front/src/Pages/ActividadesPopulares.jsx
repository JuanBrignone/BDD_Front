import React, { useEffect, useState } from "react";
import "./ActividadesPopulares.css";
import NavbarAdmin from '../Components/NavbarAdmin';


const ActividadesPopulares = () => {
  const [actividades, setActividades] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await fetch("http://localhost:8000/actividades/populares");
        if (!response.ok) {
          throw new Error("Error al obtener las actividades populares.");
        }
        const data = await response.json();
        setActividades(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchActividades();
  }, []);

  return (
    <div>
        <NavbarAdmin />
        <div className="actividades-populares-container">
      <h1>Actividades Populares</h1>
      {error && <p className="error">{error}</p>}
      <table className="actividades-table">
        <thead>
          <tr>
            <th>Actividad</th>
            <th>Cantidad de Alumnos</th>
          </tr>
        </thead>
        <tbody>
          {actividades.map((actividad, index) => (
            <tr key={index}>
              <td>{actividad.actividad}</td>
              <td>{actividad.cantidad_alumnos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default ActividadesPopulares;
