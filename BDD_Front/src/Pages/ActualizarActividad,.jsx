import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

/*Una vez dado click el boton "Editar" en ActividadesAdmin.jsx, se abre un form, que permite editar las proipedades de la actividad */
const UpdateActividad = () => {
  const { id_actividad } = useParams(); 
  const [formData, setFormData] = useState({
    nombre: "",
    descripcion: "",
    costo: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchActividad = async () => {
      try {
        const response = await fetch(`http://localhost:8000/actividades/${id_actividad}`); 
        if (response.ok) {
          const data = await response.json();
          setFormData({
            nombre: data.nombre || "",
            descripcion: data.descripcion || "",
            costo: data.costo || "",
          });
        } else {
          setErrorMessage("Error al cargar los datos de la actividad.");
        }
      } catch (error) {
        setErrorMessage("No se pudo conectar con el servidor.");
      }
    };

    fetchActividad();
  }, [id_actividad]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await fetch(`http://localhost:8000/actividades/${id_actividad}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setSuccessMessage(data.detail);
        setTimeout(() => navigate("/editaradmin"));
      } else {
        const data = await response.json();
        setErrorMessage(data.detail || "Error al actualizar la actividad.");
      }
    } catch (error) {
      setErrorMessage("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="form-container">
      <h2>Actualizar Actividad</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre">Nombre</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre de la actividad"
          />
        </div>

        <div>
          <label htmlFor="descripcion">Descripción</label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            placeholder="Descripción de la actividad"
          ></textarea>
        </div>

        <div>
          <label htmlFor="costo">Costo</label>
          <input
            type="number"
            id="costo"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
            placeholder="Costo de la actividad"
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <button type="submit">Actualizar</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default UpdateActividad;
