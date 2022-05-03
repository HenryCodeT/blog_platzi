import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import reducers from '../reducers';
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'
import Spinner from '../../general/Spinner';
import Fatal from '../../general/Fatal';

const {traerTodos: usuariosTraerTodos} = usuariosActions;
const {traerPorUsuario: publicacionesTraerPorUsuario} = publicacionesActions;

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
        return publicaciones[publicaciones_key].map((publicacion,index)=>(
            <div key={index} className='pub_titulo'>
                <h2>
                    {publicacion.title}
                </h2>
                <h3>
                    {publicacion.body}
                </h3>
            </div>
        ))
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
   publicacionesTraerPorUsuario
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Publicaciones));