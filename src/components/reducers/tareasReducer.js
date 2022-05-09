import { TRAER_TAREAS, CARGANDO_TAREAS, ERROR_TAREAS } from '../../types/tareasTypes';

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
        case 'cambio_usuario_id':
            return {
                ...state,
                usuario_id:action.payload
            }
        case 'cambio_titulo':
            return {
                ...state,
                titulo:action.payload
            }
        case 'agregada':
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