// src/Components/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/home">Actividades</Link>
                </li>
                <li>
                    <Link to="/clases">Clases</Link>
                </li>
                <li>
                    <Link to="/clases_alumno">A que estoy inscripto?</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
