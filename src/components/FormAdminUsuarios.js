import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContenedorTitulo, InputB } from "./Formularios";
import { EliminarUsuario } from "../api/EliminarUsuario";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";

import "../styles/AdminUsuarios.css";


const FormAdminUsuarios = () => {
    const [msj, setMsj] = useState();
    const [showModal, setShowModal] = useState(false);
    const handleClose = () => {
        setShowModal(false);
    }

    const history = useNavigate();
    const [idElminar, setIdElminar] = useState("");

    const onSubmit = async (e) => {
        history("/NuevoClienteEmpresa");
    };

    //Llamada a la api para eliminar usuario.
    const onSubmitEliminar = async (e) => {
        e.preventDefault();

        const resp = await EliminarUsuario(idElminar)
        var codigoRespuesta = resp['eliminar'][0]['codigoRespuesta'];
        var detalleRespuesta = resp['eliminar'][0]['detalleRespuesta'];
        console.log(resp);
        setShowModal(true)
        setMsj(detalleRespuesta)


    };

    return (
        <main>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <ContenedorTitulo>
                            <label className="titulo">Agregar un nuevo Cliente Empresa</label>
                        </ContenedorTitulo>
                        <div id="notaLogin">
                            En esta seccion podras agregar un nuevo usuario al sistema.
                        </div>
                        <div>
                            <button className="buttonAgregarUsuario" onClick={onSubmit}> + Agregar Usuario</button>
                        </div>
                    </div>
                    <div class="col">
                        <ContenedorTitulo>
                            <label className="titulo">Eliminar usuario existente</label>
                        </ContenedorTitulo>
                        <div id="notaLogin">
                            Para eliminar un usuario ingrese un "ID" que sea valido.
                        </div>
                        <form onSubmit={onSubmitEliminar} >
                            <div className="boxEliminar">
                                <InputB
                                    type="email"
                                    name="idElminar"
                                    placeholder=""
                                    value={idElminar}
                                    onChange={e => setIdElminar(e.target.value)}
                                    required
                                />
                                <div className="boxButton">
                                    <button type="submit" className="buttonEliminar">Eliminar</button>
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            <Modal showModal={showModal} onClick={handleClose} >
                <ModalAlert
                    msj={msj}
                    onClick={handleClose}
                    onClickSecondary={() => setShowModal(false)}
                    textBtn={"cancel"}
                />
            </Modal>
        </main>
    );
}

export default FormAdminUsuarios;