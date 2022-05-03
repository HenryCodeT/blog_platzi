import axios from "axios";
import { CARGANDO_PUBLICACIONES, TRAER_PUBLICACIONES } from "../types/publicacionesTypes";
import { CARGANDO, ERROR } from "../types/usuariosTypes";

export const traerTodos = () => async (dispatch) => {
    dispatch({
        type: CARGANDO
    })
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({
            type: TRAER_PUBLICACIONES,
            payload: respuesta.data
        })
    } catch (error) {
        dispatch({
            type: ERROR,
            payload: respuesta.data
        })
    }
}