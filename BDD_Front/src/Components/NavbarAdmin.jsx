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
                    <Link to="/actividades/populares">Actividaes Populares</Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavbarAdmin;
