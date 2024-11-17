import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import "./Home.css";
import Navbar from "../Components/Navbar";

const Home = () => {
    const [actividades, setActividades] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchActividades = async () => {
                const response = await fetch("http://localhost:8000/actividades");
                if (response.ok) {
                    const data = await response.json();
                    setActividades(data);
                } else {
                    setError("No se pudo obtener las actividades.");
            }
        };

        fetchActividades();
    }, []);

    return (
        <div>
            <Navbar />
            <div className="home-container">
                <h1>Actividades Disponibles</h1>
                {error && <p className="error-message">{error}</p>}
                <div className="cards-container">
                    {actividades.map((actividad) => (
                        <Card
                            key={actividad.id}
                            nombre={actividad.nombre}
                            descripcion={actividad.descripcion}
                            costo={actividad.costo}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
