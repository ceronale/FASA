import React, { useState } from "react";
import "../styles/FormClienteEmpresa.css";
import styles from "../styles/FormPacienteCliente.css";
import { EmpresaService } from "../api/EmpresaService";
import {
	Label,
	LabelReq,
	Inputs,
	GrupoInput,
	RestriccionPass,
	Inputp
} from "../components/Formularios";
import Modal from "./Modal";
import ModalAlert from "./ModalAlert";
import BaseSelect from "react-select";
import FixRequiredSelect from "../FixRequiredSelect";

const initialForm = {
	rut: '',
	nombre: '',
	apellido: '',
	apellido2: '',
	user: '',
	passwd: '',
	kamConvenios: '',
	kamCorreo: '',
	cargo: '',
	passwd2: '',
};

const FormClienteEmpresa = () => {
	const [msj, setMsj] = useState();
	const [registerData, setRegisterData] = useState({
		rut: '',
		nombre: '',
		apellido: '',
		apellido2: '',
		user: '',
		passwd: '',
		kamConvenios: '',
		kamCorreo: '',
		cargo: '',
	});

	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	}

	const { rut, nombre, apellido, apellido2, user, passwd, kamConvenios, kamCorreo, cargo, passwd2 } = registerData;

	const onchange = (event) => {
		var aux;
		//Validacion de campos de formulario solo letras
		if (event.target.name === "nombre" || event.target.name === "apellido" || event.target.name === "apellido2" || event.target.name === "kamConvenios" || event.target.name === "cargo") {
			aux = event.target.value.replace(/[^A-Za-z]+/g, '');
			updateStateOnchange(event, aux);
		}
		//Validacion rut
		else if (event.target.name === "rut") {
			aux = event.target.value.replace(/[^0-9 k K]+/g, '');
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

	const clienteEmpresa = async (data) => {
		const resp = await EmpresaService()
		return resp
	}

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
		} else {
			isPassValid = true;
		}
		if (isPassValid) {
			clienteEmpresa(registerData)
			const resp = await EmpresaService(registerData)
			var aux = resp['outActualizar'][0]['outSeq'];
			
			if (aux === 0) {
				setShowModal(true)
				setMsj("El Cliente Empresa ya existe")

			} else {
				setShowModal(true)
				setMsj("Cliente Empresa Creado")
				handleClear();
			}

		}
	};

	const handleClear = () => {
		setRegisterData(initialForm);
	};

	const Select = props => (
		<FixRequiredSelect
			{...props}
			SelectComponent={BaseSelect}
			options={options}
		/>
	);


	//Opciones Select 
	const options = [
		{ value: 'chocolate', label: 'Chocolate' },
		{ value: 'strawberry', label: 'Strawberry' },
		{ value: 'vanilla', label: 'Vanilla' }
	]
	return (
		<main>
			<form onSubmit={onSubmit}>
				<div className="row align-items-center">
					<div>
						<div class="container text-center">
							<div class="row">
								<div class="col-6">
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
											max="9"
											min="8"
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
											name="apellido2"
											placeholder=""
											value={apellido2}
											onChange={onchange}
											required
										/>
									</GrupoInput>
								</div>
								<div class="col-6">
									<div className="contenedorTitulo">
										<label className="titulo">Informacion Cuenta</label>
									</div>
									<GrupoInput>
										<Label>Correo Electronico <LabelReq> *</LabelReq></Label>
										<Inputs
											type="email"
											placeholder="example@example.com"
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
											name="passwd"
											placeholder=""
											value={passwd}
											min="7"
											max="20"
											onChange={onchange}
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
								</div>
							</div>
							<div class="row">
								<div class="col-6">
									<div className="contenedorTitulo">
										<label className="titulo">Informacion KAM</label>
									</div>
									<GrupoInput>
										<Label>Nombre Kam <LabelReq> *</LabelReq></Label>
										<Inputs
											type="text"
											name="kamConvenios"
											placeholder=""
											value={kamConvenios}
											onChange={onchange}
											required
										/>
									</GrupoInput>
									<GrupoInput>
										<Label>Correo Electronico Kam <LabelReq> *</LabelReq></Label>
										<Inputs
											type="email"
											name="kamCorreo"
											placeholder=""
											value={kamCorreo}
											onChange={onchange}
											required
										/>
										<div className="CrearEmpresa">
											<button className="buttomCrearCuenta" type="submit" >Crear Nuevo Usuario</button>
											<div className="CampoRequerido">
												<span>* Campos requeridos</span>
											</div>
										</div>
									</GrupoInput>
								</div>
								<div class="col-6">
									<div className="contenedorTitulo">
										<label className="titulo">Informacion Empresa</label>
									</div>
									<GrupoInput>
										<Label>Cargo <LabelReq> *</LabelReq></Label>
										<Inputs
											type="text"
											name="cargo"
											placeholder=""
											value={cargo}
											onChange={onchange}
											required
										/>
									</GrupoInput>
									<GrupoInput>
										<Label>Empresa (s) <LabelReq> *</LabelReq></Label>
										<Select options={options} isMulti required />
									</GrupoInput>
									{/* <select name="cars" id="cars">
									<option value="volvo">Volvo</option>
								</select> */}
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
		</main>
	);
}

export default FormClienteEmpresa;