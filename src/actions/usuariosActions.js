import axios from "axios";
import { CARGANDO, 
        ERROR, 
        TRAER_USUARIOS } from '../types/usuariosTypes'

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })
    
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
        dispatch({
            type: TRAER_USUARIOS,
            payload: respuesta.data
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:ERROR,
            payload:'Algo salio mal, intente mas tarde'
        })
    }
};