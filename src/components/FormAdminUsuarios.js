import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContenedorTitulo, InputB } from "./Formularios";
import { EliminarUsuario } from "../api/EliminarUsuario";
import Modal from "./Modal";
import ModalAlertConfirmar from "./ModalAlert/indexConfirmar";
import ModalAlert from './ModalAlert';
import "../styles/AdminUsuarios.css";


const FormAdminUsuarios = () => {
    const [msj, setMsj] = useState();
    const [showModalConfirmar, setShowModalConfirmar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const history = useNavigate();
    const [idElminar, setIdElminar] = useState("");

    const handleCloseConfirmar = () => {
        setShowModalConfirmar(false);
    }
    const handleClose = () => {
        setShowModal(false);
    }

    const handleYes = async () => {
        const resp = await EliminarUsuario(idElminar)
        var codigoRespuesta = resp['eliminar'][0]['codigoRespuesta'];
        var detalleRespuesta = resp['eliminar'][0]['detalleRespuesta'];
        setShowModalConfirmar(false);
        setShowModal(true)
        setMsj(detalleRespuesta)
        if(codigoRespuesta==0){
            setIdElminar("");
        }
    }


    const onSubmit = async (e) => {
        history("/NuevoClienteEmpresa");
    };

    //Llamada a la api para eliminar usuario.
    const onSubmitEliminar = async (e) => {
        e.preventDefault();
        setShowModalConfirmar(true)
        setMsj("¿Desea eliminar el usuario seleccionado?")
    };


    return (
        <main>
            <div className="container text-center">
                <div className="row">
                    <div className="col">
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
                    <div className="col">
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
            <Modal showModal={showModalConfirmar} onClick={handleCloseConfirmar} >
                <ModalAlertConfirmar
                    msj={msj}
                    onClick={handleYes}
                    onClickSecondary={handleCloseConfirmar}
                    textBtn={"Si"}
                    textBtn2={"No"}
                />
            </Modal>
            <Modal showModal={showModal} onClick={handleClose} >
                <ModalAlert
                    msj={msj}
                    onClick={handleClose}
                    textBtn={"Aceptar"}
                />
            </Modal>
        </main>
    );
}

export default FormAdminUsuarios;