import axios from "axios";
import { AGREGADA, CAMBIO_TITULO, CAMBIO_USUARIO_ID, CARGANDO_TAREAS, 
        ERROR_TAREAS, 
        TRAER_TAREAS } from '../types/tareasTypes'

export const traerTareas = () => async (dispatch) => {
    dispatch({
        type: CARGANDO_TAREAS
    })
    
    try {
        const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos');
        
        const tareas = {};
        respuesta.data.map((tarea)=>(
            tareas[tarea.userId] = {
                ...tareas[tarea.userId],
                [tarea.id]: {...tarea}
            }
        ))

        dispatch({
            type: TRAER_TAREAS,
            payload: tareas
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:ERROR_TAREAS,
            payload:'Informacion de tareas no disponible'
        })
    }
};

export const cambioUsuarioId = (usuario_id) => (dispatch) => {
    dispatch({
        type: CAMBIO_USUARIO_ID,
        payload: usuario_id
    })
}
export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: CAMBIO_TITULO,
        payload: titulo
    })
}

export const agregar = (nueva_tarea) => async (dispatch) =>{
    dispatch({
        type: CARGANDO_TAREAS
    })
    try {
        const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos',nueva_tarea);
        console.log(respuesta.data);
        dispatch({
            type:AGREGADA
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:ERROR_TAREAS,
            payload: 'intente mas tarde'
        })
    }
}