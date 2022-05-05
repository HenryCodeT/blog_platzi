import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {
    cambioUsuariosId = (e) =>{
        this.props.cambioUsuarioId(e.target.value)
    }
    cambioTitulo = (e)=>{
        this.props.cambioTitulo(e.target.value)
    }
    render() {
      console.log(this.props);
    return (
      <div>
          <h1>Guardar Tarea</h1>
          usuario id:
          <input 
            value = {this.props.usuario_id}
            onChange = {this.cambioUsuariosId}
            />
          <br/>
          <br/>
          Titulo:
          <input
            value={this.props.titulo}
            onChange={this.cambioTitulo}
          />
          <br/>
          <br/>
          <button>
              guardar
          </button>
      </div>
    )
  }
}
const mapStateToProps = ({ tareasReducer }) => tareasReducer
export default connect(mapStateToProps, tareasActions)(Guardar)
