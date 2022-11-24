import React, { useState } from "react";
import { PacienteService } from "../api/PacienteService";
import {
	Label,
	LabelReq,
	Inputs,
	Inputp,
	GrupoInput,
	RestriccionPass,
} from "../components/Formularios";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";
import { ValidatePass } from "../api/ValidatePass";
const initialForm = {
	rut: '',
	ndocumento: '',
	nombre: '',
	apellido: '',
	apellido2: '',
	celular: '',
	user: '',
	passwd: '',
};
// import { Validate } from "../api/Validate";
// import { Validate } from "../api/Validate";

const FormPacienteCliente = () => {
	const [msj, setMsj] = useState();
	const [checkBox, setCheckbox] = useState(false);

	const [inputRutValue, setInputRutValue] = useState("");


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

	const { rut, ndocumento, nombre, apellido, apellido2, celular, user, passwd, passwd2 } = registerData;

	/*
		function formatRut(value) {
			// if input value is falsy eg if the user deletes the input, then just return
			if (!value) return value;
			const valueLength = value.length;
	
			value=value.replace(/\./g, '').replace('-', '');
	
			if (value.match(/^(\d{2})(\d{3}){2}(\w{1})$/)) {
			  value = value.replace(/^(\d{2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
			}
			else if (value.match(/^(\d)(\d{3}){2}(\w{0,1})$/)) {
			  value = value.replace(/^(\d)(\d{3})(\d{3})(\w{0,1})$/, '$1.$2.$3-$4');
			}
			else if (value.match(/^(\d)(\d{3})(\d{0,2})$/)) {
			  value = value.replace(/^(\d)(\d{3})(\d{0,2})$/, '$1.$2.$3');
			}
			else if (value.match(/^(\d)(\d{0,2})$/)) {
			  value = value.replace(/^(\d)(\d{0,2})$/, '$1.$2');
			}
		
			return value;
		}
	*/
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

	const onSubmit = async (e) => {
		e.preventDefault();
		var isPassValid = false;
		const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
		var contains_number = /\d/.test(registerData.passwd);
		var contains_special_character = format.test(registerData.passwd);
		var contains_letter = /[a-zA-Z]/.test(registerData.passwd);
		if (!contains_letter) {
			setShowModal(true)
			setMsj("La contraseña debe contener  al menos una letra")
		} else if (!contains_number) {
			setShowModal(true)
			setMsj("La contraseña debe contener al menos un numero")

		} else if (!contains_special_character) {
			setShowModal(true)
			setMsj("La contraseña debe contener al menos un caracter especial.")
		} else if (registerData.passwd !== registerData.passwd2) {
			setShowModal(true)
			setMsj("Las contraseñas no coinciden")
		}
		else {
			isPassValid = true;
		}

		if (isPassValid) {
			const resp = await PacienteService(registerData)
			
			var aux = resp['outActualizar'][0]['outSeq'];
		
			if (aux === 0) {

				setShowModal(true)
				setMsj("El Paciente/Cliente ya existe")
			} else {
				setShowModal(true)
				setMsj("Paciente Cliente Creado")
				handleClear();
			}
			
		}


	};

	const handleClear = () => {
		setRegisterData(initialForm);
	};

	/*
		const handleInput = (e) => {
			// this is where we'll call the phoneNumberFormatter function
			const formattedPhoneNumber = formatPhoneNumber(e.target.value);
			console.log("aa");
			// we'll set the input value using our setInputValue
			setInputRutValue(formattedPhoneNumber);
			<input onChange={(e) => handleInput(e)} value={inputRutValue} />
		};
	*/
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
								<RestriccionPass>
									La contraseña debe contener desde 7 a 20 caracteres,
									se exige una letra, un numero y un caracter especial.
								</RestriccionPass>
							</GrupoInput>
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
								<button className="buttomCrearCuenta" type="submit" >Confirmar Cuenta</button>
								<div className="CampoRequerido">
									<span>* Campos requeridos</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>

			<Modal showModal={showModal} onClick={handleClose} >

				<ModalAlert
					msj={msj}
					onClick={handleClose}
					onClickSecondary={() => setShowModal(false)}
					textBtn={"cancel"}
				/>
			</Modal>
		</main >
	);
}

export default FormPacienteCliente;