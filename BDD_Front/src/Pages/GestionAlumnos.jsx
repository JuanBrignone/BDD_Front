  import React, { useState, useEffect } from "react";
  import "./GestionAlumnos.css";
  import NavbarAdmin from "../Components/NavbarAdmin";

  /*Muestra la lista de alumnos con un boton de eliminar en el costado */

  const GestionAlumno = () => {
    const [alumnos, setAlumnos] = useState([]);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchAlumnos = async () => {
        try {
          const response = await fetch("http://localhost:8000/alumnos");
          if (response.ok) {
            let data = await response.json();
            data = data.filter((alumno) => alumno.nombre.toLowerCase() !== "admin");
            setAlumnos(data);
          } else {
            setError("Error al cargar la lista de alumnos.");
          }
        } catch (err) {
          setError("Error de conexión con el servidor.");
        }
      };
      fetchAlumnos();
    }, []);
    
    return (
      <div>
      <div className="main-container">
        <NavbarAdmin />
        <div className="alumnos-list">
          <h2>Lista de Alumnos</h2>
          {message && <p style={{ color: "green" }}>{message}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {alumnos.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>CI</th>
                  <th>Nombre</th>
                  <th>Apellido</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.ci_alumno}>
                    <td>{alumno.ci_alumno}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apellido}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No hay alumnos disponibles.</p>
          )}
        </div>
      </div>
      </div>
    );
  };

  export default GestionAlumno;
