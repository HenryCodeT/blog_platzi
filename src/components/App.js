import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Menu from './Menu';
import Usuarios from './Usuarios';

const Tareas = () => <div>tareas</div>

const App = () => {
  return(
    <BrowserRouter>
      <Menu/>
      <Routes>
        <Route exact path={"/"} element={<Usuarios/>}/>
        <Route exact path={"/tareas"} element={<Tareas/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;