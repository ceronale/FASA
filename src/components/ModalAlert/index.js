import React from 'react';
import PropTypes from 'prop-types';

const ModalAlert = ({ onclick, msj, textBtn, textBtn2 }) => {


	return (
		<div className="container text-center">
			<div className="row row-cols-2">
				<div className="col-12 col-md-12">
				</div>
				<div className="col-12 col-md-12"><h3>{msj}</h3></div>

				<div className="col-12 col-md-12 mt-4">
					<div className="botonesEliminar">
						<button className="buttomEliminar" type="submit" onClick={onclick}>{textBtn}</button>
					</div>
				</div>
			</div>
		</div>
	);
};

ModalAlert.defaultProps = {
	msj: '',
	textBtn: '',
	textBtnSecondary: '',
	display: '',
	img: '',
	onClick: undefined,
	onClickSecondary: undefined,
};

ModalAlert.propTypes = {
	msj: PropTypes.string,
	textBtn: PropTypes.string,
	textBtnSecondary: PropTypes.string,
	img: PropTypes.string,
	oneOrTwo: PropTypes.bool,
	display: PropTypes.string,
	onClick: PropTypes.func,
	onClickSecondary: PropTypes.func,

};

export default ModalAlert;
