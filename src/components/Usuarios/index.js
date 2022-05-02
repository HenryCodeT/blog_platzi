import React, {Component} from 'react';
import axios from 'axios';


class Usuarios extends Component {

  constructor(){
    super();
    this.state = {
      usuarios :[]
    }
  }
  async componentDidMount(){
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/users');
    console.log(respuesta.data);
    this.setState({
      usuarios: respuesta.data
    })
  }

  ponerFilas = () => (
    this.state.usuarios.map((usuario,index)=>(
      <tr key={index}>
        <td>{usuario.name}</td>
        <td>{usuario.email}</td>
        <td>{usuario.website}</td>
      </tr>
    ))
  );
  render(){
    console.log(this.state.usuarios);
    return(
      <div className='margen'>
        <table className='tabla'>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Enlace</th>
            </tr>
          </thead>
          <tbody>
            {this.ponerFilas()}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Usuarios;