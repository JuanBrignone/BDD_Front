import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const NavbarAdmin = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/editaradmin">Editar actividades</Link>
                </li>
                <li>
                    <Link to="/adminactividades">Agregar/Eliminar actividad</Link>
                </li>
                <li>
                    <Link to="/agregarclase">Añadir clase</Link>
                </li>
                <li>
                    <Link to="/actividades/populares">Actividades Populares</Link>
                </li>
                <li>
                    <Link to="/turnos/clases">Cant. de clases por turno</Link>
                </li>
                <li>
                    <Link to="/instructores">Agregar/Eliminar Instructores</Link>
                </li>
                <li>
                    <Link to="/gestionalumnos">Alumnos</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;
