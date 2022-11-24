import React from "react";

import { FormularioUnic, Label, GrupoInput, Inputs, LabelReq} from "./Formularios";
import "../styles/OlvidasteContraseña.css";

const FormOlvidasteContraseña = () => {
    return (  
    <main className="mainUnic">
        <FormularioUnic action="">
            <div>
                <div className="contenedorTitulo">   
                    <label className="titulo">¿Olvidaste tu contraseña?</label>
                </div>
                <div className="leyenda">   
                    <label>
                        Introduzca su dirección de correo electrónico
                        a continuación para recibir un enlace 
                        de restablecimiento de contraseña.
                    </label>
                </div>
                <GrupoInput>
                    <Label  htmlFor="">Correo Electronico<LabelReq htmlFor=""> *</LabelReq></Label>
                    <Inputs type="text" />
                </GrupoInput>
                <div className="blockRegistro">
                    <div className="campoRequerido">
                        <span className="obligatorio">* Campos requeridos</span>
                    </div>
                    <div className="blockCrearCuenta">
                        <button className="buttomRestablecerContraseña">Restablecer mi contraseña</button>
                    </div>
                </div>
            </div>
        </FormularioUnic>
    </main>
    );
}
 
export default FormOlvidasteContraseña;