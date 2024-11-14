import React, { useState, useEffect } from "react";
import CardClases from "../Components/CardClases";
import "./HomeClases.css";

const HomeClases = () => {
    const [clases, setClases] = useState([]);
    const [error, setError] = useState("");
    const [showForm, setShowForm] = useState(false); 
    const [selectedClase, setSelectedClase] = useState(null); 
    const [ciAlumno, setCiAlumno] = useState(""); 

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

    const handleInscribir = (clase) => {
        setSelectedClase(clase); 
        setShowForm(true);
    };

    const handleSubmitInscripcion = async () => {
        try {
            const response = await fetch("http://localhost:8000/inscribir_alumno", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id_clase: selectedClase.id_clase,
                    ci_alumno: parseInt(ciAlumno), 
                    id_equipamiento: null 
                })
            });

            if (response.ok) {
                alert("Te has inscrito exitosamente.");
                setShowForm(false); 
                setCiAlumno(""); 
            } else {
                const errorData = await response.json();
                alert(errorData.detail || "Error al inscribirse.");
            }
        } catch (error) {
            console.error("Error al inscribirse:", error);
            alert("Hubo un error al procesar la inscripción.");
            setCiAlumno(""); 
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
                        onInscribir={() => handleInscribir(clase)}
                    />
                ))}
            </div>

            {showForm && (
                <div className="inscripcion-form">
                    <h2>Inscripción a {selectedClase.nombre_actividad}</h2>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <label>
                            CI Alumno:
                            <input
                                type="text"
                                value={ciAlumno}
                                onChange={(e) => setCiAlumno(e.target.value)}
                                placeholder="Ingresa tu CI"
                                required
                            />
                        </label>

                        <button type="button" onClick={handleSubmitInscripcion}>
                            Inscribirse
                        </button>
                        <button type="button" className="cancelar" onClick={() => setShowForm(false)}>
                            Cancelar
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default HomeClases;
