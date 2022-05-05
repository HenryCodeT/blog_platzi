import React, { Component } from 'react'
import { connect, Connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions';
import Spinner from '../../general/Spinner';
import Fatal from '../../general/Fatal';
import { Link } from 'react-router-dom';

class Tareas extends Component {
    componentDidMount(){
        this.props.traerTareas()
    }
    
    mostrarContenido = () =>{
        const{tareas, cargando, error} = this.props;
        if (cargando) {
            <Spinner/>
        }
        if (error) {
            <Fatal mensaje = {error}/>
        }

        return Object.keys(tareas).map((usuario_id)=>(
            <div key={usuario_id}>
                <h1>
                    Usuario {usuario_id}
                </h1>
                <div className='contenedor-tareas'>
                    {this.ponerTareas(usuario_id)}
                </div>
            </div>
        ))
    }

    ponerTareas = (usuario_id) =>{
        const {tareas} = this.props;
        const por_usuario = {
            ...tareas[usuario_id]
        }
        return Object.keys(por_usuario).map((tarea_id)=>(
            <div key={tarea_id} >
                <input 
                    type='checkbox' 
                    defaultChecked={por_usuario[tarea_id].completed}
                />
                {por_usuario[tarea_id].title}
            </div>
        ));
    }

    render() {
      console.log(this.props);
    return (
        <div>
            <button>
                <Link to={'/tareas/guardar'}>
                    Agregar
                </Link>
            </button>
            {this.mostrarContenido()}
        </div>
    )
    }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas)