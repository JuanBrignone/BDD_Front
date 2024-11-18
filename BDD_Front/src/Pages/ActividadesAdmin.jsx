import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListActividades = () => {
  const [actividades, setActividades] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActividades = async () => {
      try {
        const response = await fetch("http://localhost:8000/actividades"); // Cambia por tu endpoint de listado
        if (response.ok) {
          const data = await response.json();
          setActividades(data);
        } else {
          setErrorMessage("Error al cargar actividades.");
        }
      } catch (error) {
        setErrorMessage("No se pudo conectar con el servidor.");
      }
    };

    fetchActividades();
  }, []);

  return (
    <div className="list-container">
      <h2>Lista de Actividades</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id_actividad}>
            <strong>{actividad.nombre}</strong> - {actividad.descripcion} - ${actividad.costo}
            <button
              onClick={() => navigate(`/actividades/editar/${actividad.id_actividad}`)}
              style={{ marginLeft: "10px" }}
            >
              Editar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListActividades;