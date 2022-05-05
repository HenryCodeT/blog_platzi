import { combineReducers } from "redux";
import publicacionesReducer from "./publicacionesReducer";
import usuariosReducer from "./usuariosReducer";
import tareasReducer from "./tareasReducer";

export default combineReducers({
    usuariosReducer,
    publicacionesReducer,
    tareasReducer
})