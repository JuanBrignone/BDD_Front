import React, { useState, useEffect } from 'react';

const ActividadesPage = () => {
  const [actividades, setActividades] = useState([]);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', costo: '' });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/actividades")
      .then((response) => response.json())
      .then((data) => setActividades(data))
      .catch((error) => setErrorMessage("Error al obtener las actividades"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { nombre, descripcion, costo } = formData;

    fetch("http://localhost:8000/actividades", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre, descripcion, costo }),
    })
      .then((response) => response.json())
      .then((data) => {
        setActividades((prevActividades) => [...prevActividades, data]);
        setFormData({ nombre: '', descripcion: '', costo: '' }); 
      })
      .catch((error) => setErrorMessage("Error al crear la actividad"));
  };

  const handleDelete = (id_actividad) => {
    fetch(`http://localhost:8000/actividades/${id_actividad}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setActividades((prevActividades) =>
            prevActividades.filter((actividad) => actividad.id_actividad !== id_actividad)
          );
        } else {
          setErrorMessage("Error al eliminar la actividad");
        }
      })
      .catch(() => setErrorMessage("Error al eliminar la actividad"));
  };

  return (
    <div>
      <h1>Agregar Actividad</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      <form onSubmit={handleSubmit}>
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
          <label htmlFor="descripcion">Descripción:</label>
          <input
            type="text"
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="costo">Costo:</label>
          <input
            type="number"
            id="costo"
            name="costo"
            value={formData.costo}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Crear Actividad</button>
      </form>

      <h1>Eliminar Actividades</h1>
      <ul>
        {actividades.map((actividad) => (
          <li key={actividad.id_actividad}>
            <p>
              <strong>{actividad.nombre}</strong>: {actividad.descripcion} - ${actividad.costo}
            </p>
            <button onClick={() => handleDelete(actividad.id_actividad)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActividadesPage;
