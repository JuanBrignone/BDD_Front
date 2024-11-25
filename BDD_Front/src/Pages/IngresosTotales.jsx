import React, { useState, useEffect } from 'react';
import './IngresosTotales'
import NavbarAdmin from '../Components/NavbarAdmin';


/*Muestra una tabla con las actividades y todos los ingresos que genera */
const IngresosTotales = () => {
  const [ingresos, setIngresos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchIngresosTotales = async () => {
      try {
        const response = await fetch('http://localhost:8000/ingresos_totales');
        if (!response.ok) {
          throw new Error('Error al obtener los ingresos totales.');
        }
        const data = await response.json();
        setIngresos(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchIngresosTotales();
  }, []);

  return (
    <div>
        <NavbarAdmin />
    <div>
      <h2>Ingresos Totales</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {ingresos.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th>Ingresos Totales</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso, index) => (
              <tr key={index}>
                <td>{ingreso.actividad}</td>
                <td>{"$"}{ingreso.ingresos_totales}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No hay ingresos totales disponibles.</p>
      )}
    </div>
    </div>
  );
};

export default IngresosTotales;
