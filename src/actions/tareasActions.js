import axios from "axios";
import { CARGANDO_TAREAS, 
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
        type: 'cambio_usuario_id',
        payload: usuario_id
    })
}
export const cambioTitulo = (titulo) => (dispatch) => {
    dispatch({
        type: 'cambio_titulo',
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
            type:'agregada'
        })
    } catch (error) {
        console.log(error.message);
        dispatch({
            type:ERROR_TAREAS,
            payload: 'intente mas tarde'
        })
    }
}