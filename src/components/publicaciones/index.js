import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import reducers from '../reducers';
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'
import Spinner from '../../general/Spinner';
import Fatal from '../../general/Fatal';
import Comentarios from './Comentarios';

const {traerTodos: usuariosTraerTodos} = usuariosActions;
const { traerPorUsuario: publicacionesTraerPorUsuario, 
        abrirCerrar, 
        traerComentarios 
    } = publicacionesActions;

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Publicaciones extends Component {
    async componentDidMount(){
        const {usuariosTraerTodos, 
            publicacionesTraerPorUsuario, 
            params:{key}
        } = this.props;

        if (!this.props.usuariosReducer.usuarios.length) {
            await this.props.usuariosTraerTodos()
        }

        if (this.props.usuariosReducer.error) {
            return;
        }

        if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
            this.props.publicacionesTraerPorUsuario(key);
        }
    }
    
    ponerUsuario = () => {
        const { 
            usuariosReducer,
            params:{key}
        } = this.props;

        if (usuariosReducer.error) {
            return <Fatal mensaje={usuariosReducer.error}/>
        }

        if (!usuariosReducer.usuarios.length || usuariosReducer.cargando) {
            return <Spinner/>
        }

        const nombre = usuariosReducer.usuarios[key].name

        return(
            <h1>
                Publicaciones {nombre}
            </h1>
        )
    };

    ponerPublicaciones = () => {
        const {
            usuariosReducer,
            usuariosReducer: {usuarios},
            publicacionesReducer,
            publicacionesReducer: {publicaciones},
            params:{key}
        } = this.props;
        if (!usuarios.length) return;
        if (usuariosReducer.error) return;
        if (publicacionesReducer.cargando){
            return <Spinner/>
        }
        if (publicacionesReducer.error) {
            return <Fatal mensaje={publicacionesReducer.error}/>
        }
        if (!publicaciones.length) return;
        if (!('publicaciones_key' in usuarios[key])) return;
        const {publicaciones_key} = usuarios[key];
        return this.mostrarInfo(
            publicaciones[publicaciones_key],
            publicaciones_key
        )
    }   

    mostrarInfo = (publicaciones, publicaciones_key) => (
        publicaciones.map((publicacion,index)=>(
            <div 
                key={index} className='pub_titulo'
                onClick={()=>this.mostrarComentarios(publicaciones_key,index, publicacion.comentarios)}
            >
                <h2>
                    {publicacion.title}
                </h2>
                <h3>
                    {publicacion.body}
                </h3>
                {
                    (publicacion.abierto) ? <Comentarios comentarios={publicacion.comentarios}/> : ''
                }
            </div>
        ))
    );
    mostrarComentarios =(publicaciones_key,index,comentarios)=>{
        this.props.abrirCerrar(publicaciones_key, index);
        if (!(comentarios.length)) {
            this.props.traerComentarios(publicaciones_key, index);
        }
    }

    render() {
    console.log(this.props);
    return (
        <div>
            {this.ponerUsuario()}
            {this.ponerPublicaciones()}
        </div>
    )
  }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
    return {usuariosReducer, publicacionesReducer};
}

const mapDispatchToProps = {
   usuariosTraerTodos,
   publicacionesTraerPorUsuario,
   abrirCerrar,
   traerComentarios
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Publicaciones));