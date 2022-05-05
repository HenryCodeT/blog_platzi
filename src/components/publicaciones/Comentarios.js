import React from 'react'
import { connect } from 'react-redux';
import Fatal from '../../general/Fatal';
import Spinner from '../../general/Spinner';


const Comentarios = (props) => {
    console.log(props);
    if (props.comentarios_error) {
        return <Fatal mensaje= {props.comentarios_error}/>
    }
    if (props.comentarios_cargando && !props.comentarios.length) {
        return <Spinner/>
    }
    const ponerComentarios = () => (
        props.comentarios.map((comentario , index)=>
            <li key={index}>
                <b><u>{comentario.email}</u></b>
                <br/>
                {comentario.body}
            </li>
        )
    )
    console.log('hola');
    return (
    <ul>
        {ponerComentarios()}
    </ul>
  )
}

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer;

export default connect(mapStateToProps)(Comentarios)