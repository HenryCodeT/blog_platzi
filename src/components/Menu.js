import React from 'react'
import { Link } from 'react-router-dom';

const Menu = (props) => {
  return (
    <nav>
        <Link to={'/'}>Usuarios</Link>
        <br/>
        <Link to={'/tareas'}>Tareas</Link>
    </nav>
  )
}

export default Menu;