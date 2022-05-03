import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import * as usuariosActions from '../../actions/usuariosActions'
import Fatal from '../../general/Fatal';
import Tabla from './Tabla';

class Usuarios extends Component {

  async componentDidMount() {
		this.props.traerTodos();
	}

  ponerContenido = () => { 
  if (this.props.cargando) {
    return <div className='lds-dual-ring center'></div>;
  }
  if (this.props.error) {
    return <Fatal mensaje={this.props.error}/>; 
  }
  console.log(this.props);
  return <Tabla/>
  };

  render(){
    console.log(this.props);
    return(
      <div className='margen'>
        <h1>Usuarios</h1>
        {this.ponerContenido()}
      </div>
    )
  }
}

const mapStateToProps = (reducers) => {
    return reducers.usuariosReducer;
};

export default connect(mapStateToProps, usuariosActions)(Usuarios);