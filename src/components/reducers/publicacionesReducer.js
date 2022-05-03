import { TRAER_PUBLICACIONES } from "../../types/publicacionesTypes";

const INITIAL_STATE = {
    publicaciones: [],
    cargando:false,
    error:''
};
export default ( state= INITIAL_STATE, action ) => {
    switch (action.type) {
        case TRAER_PUBLICACIONES:
            return {
                ...state,
                publicaciones: action.payload,
                cargando:false
            }
        default:
            return state;
    }
}