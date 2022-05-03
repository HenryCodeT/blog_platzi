import axios from "axios";
import { CARGANDO_PUBLICACIONES, PUBLICACIONES_TRAER_POR_USUARIO, TRAER_PUBLICACIONES } from "../types/publicacionesTypes";
import { CARGANDO, ERROR } from "../types/usuariosTypes";
import * as usuariosTypes from '../types/usuariosTypes'; 
const { TRAER_USUARIOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) =>{
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const uduario_id = usuarios[key].id;
    
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${uduario_id}`);

    const publicaciones_actualizadas = [
        ...publicaciones,
        respuesta.data
    ]

    const publicaciones_key = publicaciones_actualizadas.length -1;
    const usuariosActualizados = [...usuarios];
    usuariosActualizados[key] = {
        ...usuarios[key],
        publicaciones_key
    }

    dispatch({
        type: USUARIOS_TRAER_TODOS,
        payload: usuariosActualizados
    })

    dispatch({
        type: PUBLICACIONES_TRAER_POR_USUARIO,
        payload: publicaciones_actualizadas
    })

}