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

    const handleDelete = async (ci_alumno) => {
      setMessage("");
      setError("");
    
      try {
        const deleteLoginResponse = await fetch(`http://localhost:8000/login/${ci_alumno}`, {
          method: "DELETE",
        });
    
        if (!deleteLoginResponse.ok) {
          const loginError = await deleteLoginResponse.json();
          setError(
            loginError.detail || `Error al eliminar el registro de login del alumno con CI ${ci_alumno}.`
          );
          return;
        }
    
        
        const deleteAlumnoResponse = await fetch(`http://localhost:8000/alumnos/${ci_alumno}`, {
          method: "DELETE",
        });
    
        if (deleteAlumnoResponse.ok) {
          setMessage(`Alumno con CI ${ci_alumno} eliminado exitosamente.`);
          setAlumnos((prev) => prev.filter((alumno) => alumno.ci_alumno !== ci_alumno));
        } else {
          const alumnoError = await deleteAlumnoResponse.json();
          setError(
            alumnoError.detail || `Error al eliminar al alumno con CI ${ci_alumno} de la base de datos.`
          );
        }
      } catch (err) {
        setError("Error de conexión con el servidor.");
      }
    };
    
    

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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.ci_alumno}>
                    <td>{alumno.ci_alumno}</td>
                    <td>{alumno.nombre}</td>
                    <td>{alumno.apellido}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(alumno.ci_alumno)}
                        className="delete-btn"
                      >
                        Eliminar
                      </button>
                    </td>
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
