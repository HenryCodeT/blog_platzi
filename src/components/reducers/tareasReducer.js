import { TRAER_TAREAS, CARGANDO_TAREAS, ERROR_TAREAS, CAMBIO_USUARIO_ID, CAMBIO_TITULO, AGREGADA } from '../../types/tareasTypes';

const INITIAL_STATE = {
    tareas: {},
    cargando:false,
    error:'',
    usuario_id: '',
    titulo: ''
};
export default ( state= INITIAL_STATE, action ) => {
    switch (action.type) {
        case TRAER_TAREAS:
            return {
                ...state, 
                tareas: action.payload,
                cargando: false,
                error: ''
            };
        case CARGANDO_TAREAS:
            return {
                ...state,
                cargando: true
            };
        case ERROR_TAREAS:
            return {
                ...state,
                error: action.payload,
                cargando : false
            }
        case CAMBIO_USUARIO_ID:
            return {
                ...state,
                usuario_id:action.payload
            }
        case CAMBIO_TITULO:
            return {
                ...state,
                titulo:action.payload
            }
        case AGREGADA:
            return {
                ...state,
                tareas:{},
                cargando: false,
                error: ''
            }
            default:
            return state;
    }
}