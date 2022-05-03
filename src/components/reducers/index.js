import { combineReducers } from "redux";
import publicacionesReducer from "./publicacionesReducer";
import usuariosReducer from "./usuariosReducer";

export default combineReducers({
    usuariosReducer,
    publicacionesReducer
})