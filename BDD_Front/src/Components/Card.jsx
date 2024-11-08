import React from "react";
import "./Card.css";

const Card = ({ nombre, descripcion, costo }) => {
    return (
        <div className="card">
            <h2 className="card-title">{nombre}</h2>
            <p className="card-description">{descripcion}</p>
            <p className="card-cost">Costo: ${costo}</p>
        </div>
    );
};

export default Card;
