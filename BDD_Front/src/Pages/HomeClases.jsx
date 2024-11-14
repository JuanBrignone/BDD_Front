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
                    />
                ))}
            </div>
        </div>
    );
};

export default HomeClases;
