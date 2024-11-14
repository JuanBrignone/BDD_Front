import React, { useState, useEffect } from "react";
import CardClases from "../Components/CardClases";
import "./HomeClases.css";

const HomeClases = () => {
    const [clases, setClases] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchClases = async () => {
                const response = await fetch("http://localhost:8000/clases");
                if (response.ok) {
                    const data = await response.json();
                    setClases(data);
                } else {
                    setError("No se pudo obtener las clases.");
                }    
        };

        fetchClases();
    }, []);

    const handleInscribir = async (id_clase) => {
        const ci_alumno = prompt("Por favor, ingresa tu CI:");
    
        if (!ci_alumno) {
            alert("CI es requerido.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:8000/inscribir_alumno", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_clase: parseInt(id_clase),
                    ci_alumno: parseInt(ci_alumno), // Asegúrate de que sea un número entero
                    id_equipamiento: null // Cambia según sea necesario
                })
            });
    
            if (response.ok) {
                alert("Te has inscrito exitosamente.");
            } else {
                const errorData = await response.json();
                alert(errorData.detail || "Error al inscribirse.");
            }
        } catch (error) {
            console.error("Error al inscribirse:", error);
            alert("Hubo un error al procesar la inscripción.");
        }
    };


    return (
        <div className="home-clases-container">
            <h1>Clases Disponibles</h1>
            {error && <p className="error-message">{error}</p>}
            <div className="cards-container">
                {clases.map((clase) => (
                    <CardClases
                        key={clase.id_clase}
                        nombre_actividad={clase.nombre_actividad}
                        nombre_instructor={clase.nombre_instructor}
                        hora_inicio={clase.hora_inicio}
                        hora_fin={clase.hora_fin}
                        costo_actividad={clase.costo_actividad}
                        onInscribir={() => handleInscribir(clase.id_clase)}
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeClases;
