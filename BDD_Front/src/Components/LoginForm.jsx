import React, { useState } from "react";
import "./LForm.css";
import { useNavigate } from "react-router-dom";

const LoginForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({ correo: "", contraseña: "" });
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
            const response = await fetch("http://localhost:8000/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                navigate("/")
                onSubmit(data); // Llama a la función onSubmit si la autenticación es exitosa
            } else {
                setErrorMessage("Correo o contraseña incorrectos");
            }
    };

    return (
        <form className="login-form-container" onSubmit={handleSubmit}>
            <h1 className="login-form-title">Iniciar Sesión</h1>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="login-form-group">
                <label className="login-form-label" htmlFor="correo">
                    Correo
                </label>
                <input
                    type="email"
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    className="login-form-input"
                    required
                />
            </div>

            <div className="login-form-group">
                <label className="login-form-label" htmlFor="contraseña">
                    Contraseña
                </label>
                <input
                    type="password"
                    id="contraseña"
                    name="contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="login-form-input"
                    required
                />
            </div>

            <button type="submit" className="login-form-button">
                Ingresar
            </button>
        </form>
    );
};

export default LoginForm;
