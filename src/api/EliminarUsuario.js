const axios = require('axios');

export const EliminarUsuario = async (data) => {
    console.log(data);
    const config = {
        method: 'post',
        url: 'http://localhost:8181/cxf/eliminarUsuario/services/eliminar',
        headers: {
            'Content-Type': 'application/json',
            id: data,
        },
    };

    const response = axios(config)
        .then(({ data: outEliminar }) => {
            console.log(outEliminar);
            return outEliminar;
        })
        .catch((error) => {
            return error;
        });

    return response;
}