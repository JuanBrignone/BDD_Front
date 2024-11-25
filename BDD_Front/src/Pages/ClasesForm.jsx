import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import NavbarAdmin from '../Components/NavbarAdmin';
import './ClasesForm.css';


/*Muestra un form, para crear clases, mostrando actividades, instructores y turnos para poder crear la actividad*/
const ClaseForm = () => {
    const navigate = useNavigate();
    const [clases, setClases] = useState([]);
    const [formData, setFormData] = useState({
    id_actividad: '',
    ci_instructor: '',
    id_turno: ''
    });
    const [actividades, setActividades] = useState([]);
    const [instructores, setInstructores] = useState([]);
    const [turnos, setTurnos] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetch("http://localhost:8000/actividades")
      .then((response) => response.json())
      .then((data) => setActividades(data))
      .catch(() => setErrorMessage("Error al obtener actividades"));

    fetch("http://localhost:8000/instructores")
      .then((response) => response.json())
      .then((data) => setInstructores(data))
      .catch(() => setErrorMessage("Error al obtener instructores"));

    fetch("http://localhost:8000/turnos")
      .then((response) => response.json())
      .then((data) => setTurnos(data))
      .catch(() => setErrorMessage("Error al obtener turnos"));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { id_actividad, ci_instructor, id_turno } = formData;

    const actividadSeleccionada = actividades.find(
      (actividad) => actividad.id_actividad === parseInt(id_actividad)
    );

    if (!actividadSeleccionada) {
      setErrorMessage("Actividad no seleccionada correctamente");
      return;
    }

    fetch("http://localhost:8000/clases", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nombre_actividad: actividadSeleccionada.nombre,
        ci_instructor: formData.ci_instructor,
        id_turno: formData.id_turno,
        dictada: true, 
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setClases((prevClases) => [...prevClases, data]);
        setFormData({ id_actividad: '', ci_instructor: '', id_turno: '' }); 
        setSuccessMessage("Clase creada exitosamente");
        navigate("/adminactividades")
      })
      .catch((error) => {
        console.error("Error al crear la clase", error);
        setErrorMessage("Hubo un error al crear la clase");
      });
};

  return (
    <div>
      <NavbarAdmin />
      <div>
      <h1>Crear Clase</h1>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="id_actividad">Actividad:</label>
          <select
            id="id_actividad"
            name="id_actividad"
            value={formData.id_actividad}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona una actividad</option>
            {actividades.map((actividad) => (
              <option key={actividad.id_actividad} value={actividad.id_actividad}>
                {actividad.nombre}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ci_instructor">Instructor:</label>
          <select
            id="ci_instructor"
            name="ci_instructor"
            value={formData.ci_instructor}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un instructor</option>
            {instructores.map((instructor) => (
              <option key={instructor.ci_instructor} value={instructor.ci_instructor}>
                {instructor.nombre} {instructor.apellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="id_turno">Turno:</label>
          <select
            id="id_turno"
            name="id_turno"
            value={formData.id_turno}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona un turno</option>
            {turnos.map((turno) => (
              <option key={turno.id_turno} value={turno.id_turno}>
                {turno.hora_inicio} - {turno.hora_fin}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Crear Clase</button>
      </form>
    </div>
    </div>
  );
};

export default ClaseForm;
