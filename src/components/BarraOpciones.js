import React from "react";
import "../styles/BarraOpciones.css";
import { NavLink } from "react-router-dom";

const BarraOpciones = () => {
    return (  
        <div className="Barra">
            <div className="contenedorOpciones">
                <NavLink to="/AdministrarRoles" className="opcion" >Administrar Roles</NavLink>
                <NavLink to="/AdministrarUsuarios" className="opcion" >Administrar Usuarios</NavLink>
            </div>
        </div>
    );
}
 
export default BarraOpciones;