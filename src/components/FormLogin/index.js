import React, { useState, useRef } from 'react';
import { LoginService } from '../../api/LoginService';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import ReCAPTCHA from "react-google-recaptcha";
import { NavLink } from "react-router-dom";
import "../../styles/Login.css";
import {
	Label,
	LabelReq,
	Inputs,
	GrupoInput,
	Inputp,
} from "../Formularios";
import Modal from '../Modal';
import ModalAlert from '../ModalAlert';

const FormLogin = () => {
	const [msj, setMsj] = useState();
	const [showModal, setShowModal] = useState(false);
	const handleClose = () => {
		setShowModal(false);
	}
	const [btnValid, setBtnValid] = useState(false);
	console.log(btnValid);

	const navigate = useNavigate();

	const captcha = useRef(null);

	const validCaptcha = () => {
		console.log(captcha.current);
		if (captcha.current.getValue().length > 0) {
			console.log('El usuario no es un robot')
			setBtnValid(true)
		}
		else {
			console.log('Por favor acepta el captcha')
			setBtnValid(false)

		}
	}

	const [registerData, setRegisterData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = registerData;

	const onchange = (event) => {
		setRegisterData((prev) => ({
			...prev,
			[event.target.name]: event.target.value,
		}));
	};

	// const fecth = async (payload) => {
	// 	const resp = await LoginService(payload);
	// 	console.log(resp);
	// }

	// Validaciones del Login
	const onSubmit = async (e) => {
		e.preventDefault();
		//console.log(registerData);

		const resp = await LoginService(registerData);
		const r = JSON.parse(resp);
		//console.log(r);

		// const {outLoginModel[0]}=resp
		// console.log(codigoresultado);

		// Condicional segun el codigo de respuesta (0=ok - 1=No Existe - 2=Usuario Invalido - 3=Pass Expirada)
		if (r.login[0].codigoResultadoLogin === 0) {
			console.log('Usuario Correcto');
			switch (r.login[0].tipo) {
				
				case "Empresa":
					console.log("Llegue 2");
					navigate(`/HomeEmpresa/${registerData.email}`);
					break;
				case "Administrador":
					navigate(`/Home/${registerData.email}`);
					break;
				case "Paciente":
					navigate(`/Home/${registerData.email}`);
					break;
				default:
			}

		} else if (r.login[0].codigoResultadoLogin === 1) {
			setShowModal(true)
			setMsj("El usuario no existe")
			console.log('El usuario no existe')
		} else if (r.login[0].codigoResultadoLogin === 2) {
			console.log('Usuario Invalido')
			setShowModal(true)
			setMsj("Usuario Invalido")
		} else if (r.login[0].codigoResultadoLogin === 3) {
			console.log('Clave Expirada')
			navigate("/CambiarPass")
		}
		console.log(resp);
	};

	return (
		<div className="row align-items-center">
			<div className="col-md-8">
				<div>
					<div className="contenedorTitulo">
						<label className="titulo">Usuarios Registrados</label>
					</div>
					<div id="notaLogin">
						Si tiene una cuenta, inicie sesión con su dirección de correo
						electrónico.
					</div>
					<form className={styles.form} onSubmit={onSubmit}>
						<GrupoInput>
							<Label>Correo Electronico <LabelReq> *</LabelReq></Label>
							<Inputs
								type="email"
								placeholder=""
								name="email"
								value={email}
								onChange={onchange}
								required
							/>
						</GrupoInput>
						<GrupoInput>
							<Label>Contraseña <LabelReq> *</LabelReq></Label>
							<Inputp
								type="password"
								name="password"
								placeholder=""
								min="7"
								max="20"
								value={password}
								onChange={onchange}
								required
							/>
						</GrupoInput>
						<div className="recaptcha">
							<ReCAPTCHA
								ref={captcha}
								sitekey="6Lek9tsiAAAAAOUyn_NBrROccYIf_-w38fsocNlN"
								onChange={validCaptcha}
							/>
						</div>
						<div className='accionLogin'>
							<div className='botonLogin'>
								{btnValid === !false && (
									<button type="submit">Inicio Sesion</button>
								)}
							</div>
							<div className="olvidasteContraseña">
								<li id="li-contraseña">
									<NavLink to="/OlvidasteContraseña">
										¿Olvidaste tu contraseña?
									</NavLink>
								</li>
							</div>
							<div id="requerido">
								<span>* Campos requeridos</span>
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
				</div>
			</div>
		</div>
	);
};

export default FormLogin