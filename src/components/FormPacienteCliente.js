import React, { useState } from "react";
import { PacienteService, GenerarToken, ValidarToken } from "../api/PacienteService";
import { useNavigate } from 'react-router-dom';
import { Label, LabelReq, Inputs, Inputp, GrupoInput, RestriccionPass, } from "../components/Formularios";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";

const initialForm = {
	rut: '',
	ndocumento: '',
	nombre: '',
	apellido: '',
	apellido2: '',
	celular: '',
	user: '',
	passwd: '',
	passwd2: '',
};

// import { Validate } from "../api/Validate";
// import { Validate } from "../api/Validate";

const FormPacienteCliente = () => {

	const navigate = useNavigate();
	const [msj, setMsj] = useState();
	const [checkBox, setCheckbox] = useState(false);
	const delay = ms => new Promise(res => setTimeout(res, ms));
	const [registerData, setRegisterData] = useState({
		rut: '',
		ndocumento: '',
		nombre: '',
		apellido: '',
		apellido2: '',
		celular: '',
		user: '',
		passwd: '',
		passwd2: '',
		terminos: 'false'
	});

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	}

	const [checkToken, setcheckToken] = useState(false);
	const [token, setToken] = useState("");



	const { rut, ndocumento, nombre, apellido, apellido2, celular, user, passwd, passwd2 } = registerData;

	const onchange = (event) => {
		var aux;
		//Validacion de campos de formulario solo letras
		if (event.target.name === "nombre" || event.target.name === "apellido" || event.target.name === "apellido2") {
			aux = event.target.value
			aux = aux.replace(/[^A-Za-z]+/g, '');
			updateStateOnchange(event, aux);
		}
		//Validacion de campos de formulario solo numeros
		else if (event.target.name === "ndocumento" || event.target.name === "celular") {
			aux = event.target.value
			aux = aux.replace(/[^0-9]+/g, '');
			updateStateOnchange(event, aux);
		}
		//Validacion rut
		else if (event.target.name === "rut") {
			aux = event.target.value
			aux = aux.replace(/[^0-9 k K]+/g, '');
			updateStateOnchange(event, aux);
		} else {
			setRegisterData((prev) => ({
				...prev,
				[event.target.name]: event.target.value,
			}));
		}
	};

	function updateStateOnchange(event, aux) {
		setRegisterData((prev) => ({
			...prev,
			[event.target.name]: aux,
		}));
	}
	const handleClickRemember = (event) => {
		setCheckbox(!checkBox);
		setRegisterData((prev) => ({
			...prev,
			[event.target.name]: !checkBox,
		}));
	};

	const handleClickConfirmarToken = async (e) => {
		e.preventDefault();
		const respValidToken = await ValidarToken(token, registerData.user);
		var msj = respValidToken['validaToken'][0]['detalleResultado'];
		setShowModal(true)
		setMsj(msj)
		if (respValidToken['validaToken'][0]['codigoResultado'] === 0) {
			handleClear();
			//Redireccionar al home usuario cliente recien creado
			await delay(5000);
			navigate(`/Home/${registerData.user}`)

		}

	};



	const onChangeToken = (event) => {
		setToken(event.target.value);
	}

	const onSubmit = async (e) => {
		e.preventDefault();

		var isPassValid = contraseñaValidar();
		if (isPassValid) {
			const resp = await PacienteService(registerData)
			var aux = resp['outActualizar'][0]['outSeq'];
			if (aux === 0) {
				setShowModal(true)
				setMsj("El Paciente/Cliente ya existe")
			} else {
				setShowModal(true)
				setMsj("Paciente Cliente Creado")
				//Envio de token 
				const respToken = await GenerarToken(registerData.user);
				setcheckToken(true);
			}
		}

	};

	function contraseñaValidar() {
		const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		var contains_number = /\d/.test(registerData.passwd);
		var contains_special_character = format.test(registerData.passwd);
		var contains_letter = /[a-zA-Z]/.test(registerData.passwd);
		var contains_upperletter = /[A-Z]/.test(registerData.passwd);
		if (!contains_letter) {
			setShowModal(true)
			setMsj("La contraseña debe contener al menos una letra")
			return false;
		} else if (!contains_upperletter) {
			setShowModal(true)
			setMsj("La contraseña debe contener al menos una letra mayuscula")
		} else if (!contains_number) {
			setShowModal(true)
			setMsj("La contraseña debe contener al menos un numero")
			return false;
		} else if (!contains_special_character) {
			setShowModal(true)
			setMsj("La contraseña debe contener al menos un caracter especial.")
			return false;
		} else if (registerData.passwd !== registerData.passwd2) {
			setShowModal(true)
			setMsj("Las contraseñas no coinciden")
			return false;
		} else {
			return true;
		}
		return false;
	};

	const handleClear = () => {
		setRegisterData(initialForm);
		setToken("");
	};


	return (
		<main>
			<form onSubmit={onSubmit}>
				<div className="container text-center">
					<div className="row">
						<div className="col">
							<div className="contenedorTitulo">
								<label className="titulo">Informacion Personal</label>
							</div>
							<GrupoInput>
								<Label>RUT <LabelReq> *</LabelReq></Label>
								<Inputp
									type="text"
									placeholder="Sin punto ni guión"
									name="rut"
									value={rut}
									min="8"
									max="9"
									onChange={onchange}
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>N° Documento <LabelReq> *</LabelReq></Label>
								<Inputp
									type="text"
									placeholder=""
									name="ndocumento"
									min="8"
									max="9"
									value={ndocumento}
									onChange={onchange}
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>Nombre <LabelReq> *</LabelReq></Label>
								<Inputs
									type="text"
									name="nombre"
									placeholder=""
									value={nombre}
									onChange={onchange}
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>1° Apellido <LabelReq> *</LabelReq></Label>
								<Inputs
									type="text"
									name="apellido"
									placeholder=""
									value={apellido}
									onChange={onchange}
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>2° Apellido <LabelReq> *</LabelReq></Label>
								<Inputs
									type="text"
									placeholder=""
									name="apellido2"
									value={apellido2}
									onChange={onchange}
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>Celular <LabelReq> *</LabelReq></Label>
								<Inputp
									type="text"
									placeholder=""
									name="celular"
									min="8"
									max="8"
									value={celular}
									onChange={onchange}
									required
								/>
							</GrupoInput>
						</div>
						<div className="col">
							<div className="contenedorTitulo">
								<label className="titulo">Informacion de la cuenta</label>
							</div>
							<GrupoInput>
								<Label>Correo Electronico <LabelReq> *</LabelReq></Label>
								<Inputs
									type="email"
									placeholder=""
									name="user"
									value={user}
									onChange={onchange}
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>Contraseña <LabelReq> *</LabelReq></Label>
								<Inputp
									type="password"
									placeholder=""
									name="passwd"
									value={passwd}
									onChange={onchange}
									min="7"
									max="20"
									required
								/>
							</GrupoInput>
							<GrupoInput>
								<Label>Confirmar Contraseña <LabelReq> *</LabelReq></Label>
								<Inputp
									type="password"
									placeholder=""
									name="passwd2"
									value={passwd2}
									onChange={onchange}
									min="7"
									max="20"
									required
								/>
								{checkToken === false && (
									<RestriccionPass>
										La contraseña debe contener desde 7 a 20 caracteres,
										se exige una letra minuscula y una mayuscula, un numero y un caracter especial.
									</RestriccionPass>
								)}
							</GrupoInput>
							{checkToken === false && (
								<div>
									<div className="boxTerminos">
										<input
											type="checkbox"
											name="terminos"
											value={checkBox}
											checked={checkBox}
											onChange={handleClickRemember}
											required
										/>
										<div className="aceptoTerminos">
											<p> Acepto los <NavLink className="navTerminos" to="">Terminos y condiciones</NavLink></p>
										</div>
									</div>
									<div className="CrearPaciente">
										<button className="buttomCrearCuenta" type="submit" >Crear Cuenta</button>

										<div className="CampoRequerido">
											<span>* Campos requeridos</span>
										</div>
									</div>
								</div>
							)}
							{checkToken === !false && (
								<div>
									<GrupoInput>
										<RestriccionPass>
											Se ha enviado un token de verificación a tu correo
										</RestriccionPass>
										<Label>Confirmar Token <LabelReq> *</LabelReq></Label>
										<Inputs
											type="text"
											placeholder=""
											name="token"
											value={token}
											onChange={onChangeToken}
											required />
									</GrupoInput>
									<div className="CrearPaciente">
										<button className="buttomCrearCuenta" onClick={handleClickConfirmarToken} >Confirmar Token</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</form>

			<Modal showModal={showModal} onClick={handleClose} >
				<ModalAlert
					msj={msj}
					onClick={handleClose}
					onClickSecondary={() => setShowModal(false)}
					textBtn={"Aceptar"}
				/>
			</Modal>
		</main >
	);
}

export default FormPacienteCliente;