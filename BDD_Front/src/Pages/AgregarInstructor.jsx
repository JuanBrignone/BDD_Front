import React, { useState, useEffect } from "react";
import "./AgregarInstructor.css";
import NavbarAdmin from "../Components/NavbarAdmin";

const AgregarInstructor = () => {
  const [formData, setFormData] = useState({
    ci_instructor: "",
    nombre: "",
    apellido: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [instructores, setInstructores] = useState([]);

  useEffect(() => {
    const fetchInstructores = async () => {
      try {
        const response = await fetch("http://localhost:8000/instructores");
        if (response.ok) {
          const data = await response.json();
          setInstructores(data);
        } else {
          setError("Error al cargar la lista de instructores.");
        }
      } catch (err) {
        setError("Error de conexión con el servidor.");
      }
    };
    fetchInstructores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await fetch("http://localhost:8000/instructores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage(`Instructor ${data.nombre} ${data.apellido} creado exitosamente.`);
        setFormData({ ci_instructor: "", nombre: "", apellido: "" });

        setInstructores((prev) => [...prev, data]);
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error al crear el instructor.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  const handleDelete = async (ci_instructor) => {
    setMessage("");
    setError("");

    try {
      const response = await fetch(`http://localhost:8000/instructores/${ci_instructor}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage(`Instructor con CI ${ci_instructor} eliminado exitosamente.`);
        setInstructores((prev) =>
          prev.filter((instructor) => instructor.ci_instructor !== ci_instructor)
        );
      } else {
        const errorData = await response.json();
        setError(errorData.detail || "Error al eliminar el instructor.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="main-container">
      <NavbarAdmin />
      <div>
        <h2>Agregar Instructor</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="ci_instructor">CI del Instructor:</label>
            <input
              type="text"
              id="ci_instructor"
              name="ci_instructor"
              value={formData.ci_instructor}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="nombre">Nombre:</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="apellido">Apellido:</label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Crear Instructor</button>
        </form>
        {message && <p style={{ color: "green" }}>{message}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
      <div className="instructores-list">
        <h2>Lista de Instructores</h2>
        {instructores.length > 0 ? (
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
              {instructores.map((instructor) => (
                <tr key={instructor.ci_instructor}>
                  <td>{instructor.ci_instructor}</td>
                  <td>{instructor.nombre}</td>
                  <td>{instructor.apellido}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(instructor.ci_instructor)}
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
          <p>No hay instructores disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default AgregarInstructor;
