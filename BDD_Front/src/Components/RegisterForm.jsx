import { useState } from "react";
import "./Rform.css";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    ci_alumno: "",
    nombre: "",
    apellido: "",
    fecha_nacimiento: "",
    telefono: "",
    correo: "",
    contraseña: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

    // Validación de teléfono (9 dígitos)
    const phoneRegex = /^[0-9]{9}$/;
    if (!phoneRegex.test(formData.telefono)) {
      setErrorMessage("El teléfono debe tener 9 dígitos.");
      return;
    }

    // Validación de fecha de nacimiento (Formato AAAA-MM-DD)
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(formData.fecha_nacimiento)) {
      setErrorMessage("La fecha de nacimiento debe estar en formato AAAA-MM-DD.");
      return;
    }


    const response = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      setSuccessMessage("Registro exitoso");
      setFormData({
        ci_alumno: "",
        nombre: "",
        apellido: "",
        fecha_nacimiento: "",
        telefono: "",
        correo: "",
        contraseña: "",
      });
    } else {
      const data = await response.json();
      setErrorMessage(data.detail || "Hubo un error al registrar.");
    }
  };

  return (
    <div className="form-container">
      <h2>Registro de Alumno</h2>
      <form onSubmit={handleSubmit}>

      <div>
          <label htmlFor="nombre">Nombre</label>
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
          <label htmlFor="ci_alumno">Cédula</label>
          <input
            type="number"
            id="ci_alumno"
            name="ci_alumno"
            value={formData.ci_alumno}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="apellido">Apellido</label>
          <input
            type="text"
            id="apellido"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="fecha_nacimiento">Fecha de Nacimiento</label>
          <input
            type="date"
            id="fecha_nacimiento"
            name="fecha_nacimiento"
            value={formData.fecha_nacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="telefono">Teléfono</label>
          <input
            type="tel"
            id="telefono"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            required
            pattern="[0-9]{9}"
            maxLength="9"
          />
        </div>

        <div>
          <label htmlFor="correo">Correo</label>
          <input
            type="email"
            id="correo"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="contraseña">Contraseña</label>
          <input
            type="password"
            id="contraseña"
            name="contraseña"
            value={formData.contraseña}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}

        <button type="submit">Registrar</button>
      </form>
    </div>
  );
};

export default RegisterForm;
