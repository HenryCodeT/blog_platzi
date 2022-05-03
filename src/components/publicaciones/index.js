import React, { Component } from 'react'
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import reducers from '../reducers';
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/usuariosActions'

const {traerTodos: usuariosTraerTodos} = usuariosActions;
const {traerTodos: publicacionesTraerTodos} = publicacionesActions;

function withParams(Component) {
	return props => <Component {...props} params={useParams()} />;
}

class Publicaciones extends Component {

    componentDidMount(){
        if (!this.props.usuariosReducer.usuarios.length) {
            this.props.usuariosTraerTodos()
        }
    }

  render() {
    console.log(this.props);
    return (
        <div>
            <h1>Publicaciones de </h1>
            {this.props.params.key}
        </div>
    )
  }
}

const mapStateToProps = ({usuariosReducer, publicacionesReducer}) => {
    return {usuariosReducer, publicacionesReducer};
}

const mapDispatchToProps = {
   usuariosTraerTodos,
   publicacionesTraerTodos
}

export default connect(mapStateToProps, mapDispatchToProps)(withParams(Publicaciones));