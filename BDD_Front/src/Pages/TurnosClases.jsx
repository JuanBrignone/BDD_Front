import React, { useEffect, useState } from "react";
import NavbarAdmin from "../Components/NavbarAdmin";

const TurnosClases = () => {
  const [turnosClases, setTurnosClases] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/turnos/clases")
      .then((response) => response.json())
      .then((data) => setTurnosClases(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
    <NavbarAdmin />
    <div>
      <h2>Turnos y Clases Dictadas</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Turno</th>
            <th>Clases Dictadas</th>
          </tr>
        </thead>
        <tbody>
          {turnosClases.map((turno, index) => (
            <tr key={index}>
              <td>{turno.turno}</td>
              <td>{turno.clases_dictadas}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default TurnosClases;
