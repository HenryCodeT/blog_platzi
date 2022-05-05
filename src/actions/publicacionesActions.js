import axios from "axios";
import { CARGANDO_PUBLICACIONES, 
        ACTUALIZAR, 
        TRAER_PUBLICACIONES, 
        COMENTARIOS_CARGANDO, 
        COMENTARIOS_ERROR,
        COMENTARIOS_ACTUALIZAR } from "../types/publicacionesTypes";
import { CARGANDO, ERROR } from "../types/usuariosTypes";
import * as usuariosTypes from '../types/usuariosTypes'; 
const { TRAER_USUARIOS: USUARIOS_TRAER_TODOS } = usuariosTypes;

export const traerPorUsuario = (key) => async (dispatch, getState) =>{
    dispatch({
        type: CARGANDO
    });
    
    const { usuarios } = getState().usuariosReducer;
    const { publicaciones } = getState().publicacionesReducer;
    const uduario_id = usuarios[key].id;
    
    try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${uduario_id}`);
        
        const nuevas = respuesta.data.map((publicacion)=>({
            ...publicacion,
            comentarios: [],
            abierto: false
        }));
        
        const publicaciones_actualizadas = [
            ...publicaciones,
            nuevas
        ]

        dispatch({
            type: ACTUALIZAR,
            payload: publicaciones_actualizadas
        })

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

    } catch (error) {
        console.log(error.message);
        dispatch({
            type: ERROR,
            payload: 'Publicaciones no disponibles'
        })
    }
}

export const abrirCerrar = (publicaciones_key, index) => (dispatch, getState) => {
    const {publicaciones} = getState().publicacionesReducer;
    const seleccionada = publicaciones[publicaciones_key][index];
    const actualizada = {
        ...seleccionada,
        abierto: !seleccionada.abierto
    };
    const publicaciones_actualizadas = [...publicaciones]
    publicaciones_actualizadas[publicaciones_key] = [...publicaciones[publicaciones_key]]

    publicaciones_actualizadas[publicaciones_key][index] = actualizada;

    dispatch({
        type: ACTUALIZAR,
        payload: publicaciones_actualizadas
    })
}

export const traerComentarios = (publicaciones_key,index) => async (dispatch, getState) => {
    dispatch({
        type: COMENTARIOS_CARGANDO
    })
    
    const {publicaciones} = getState().publicacionesReducer;
    const seleccionada = publicaciones[publicaciones_key][index];

   try {
        const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)

        const actualizada = {
            ...seleccionada,
            comentarios: respuesta.data
        };
        const publicaciones_actualizadas = [...publicaciones]
        publicaciones_actualizadas[publicaciones_key] = [...publicaciones[publicaciones_key]]

        publicaciones_actualizadas[publicaciones_key][index] = actualizada;
        
        dispatch({
            type: COMENTARIOS_ACTUALIZAR,
            payload: publicaciones_actualizadas
        });
   } catch (error) {
       console.log(error.message);
       dispatch({
           type: COMENTARIOS_ERROR,
           payload: 'comentarios no disponibles'
       })
   }
}