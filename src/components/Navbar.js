import React from 'react'
import 'primeicons/primeicons.css';
import "../styles/Navbar.css";
import { NavLink } from "react-router-dom";

import logoFarmaciasAhumada from '../components/img/logoFarmaciasAhumada.jpg'
import logoCuenta from '../components/img/logoCuenta.png'


function Navbar() {
  return (
    <>
      <nav>
        <div>
          <img src={logoFarmaciasAhumada} height={53} alt="logo"></img>
        </div>
        <div className="iconoNavbar">
          <img src={logoCuenta} height={29} alt="iconocuenta"></img>
          <ul className="navbar">
            <NavLink className="miCuenta" to="/Home">Mi Cuenta</NavLink>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar;
