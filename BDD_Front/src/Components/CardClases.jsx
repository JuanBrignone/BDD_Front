import React from "react";
import "./CardClases.css";

const CardClases = ({ id_clase, nombre_actividad, nombre_instructor, hora_inicio, hora_fin, costo_actividad, onInscribir }) => {
    return (
        <div className="card-clases">
            <h2 className="card-title">{nombre_actividad}</h2>
            <p className="card-instructor">Instructor: {nombre_instructor}</p>
            <p className="card-schedule">Horario: {hora_inicio} - {hora_fin}</p>
            <p className="card-cost">Costo: ${costo_actividad}</p>
            <button onClick={() => onInscribir(id_clase)}>Inscribirse</button>
        </div>
    );
};

export default CardClases;
