import React, {useContext, useEffect} from "react";
import {BrowserRouter as Router, Navigate, Outlet, Route, Routes} from 'react-router-dom'
import Login from "../views/login";
import CadastroUsuario from "../views/cadastroUsuario";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consulta-lancamentos";
import CadastroLancamentos from "../views/lancamentos/cadastro-lancamentos";
import {AuthContext, AuthConsumer} from "./provedorAutenticacao";
import Navbar from "../components/navbar";

const PrivateRoute = ({isUsuarioAutenticado, element}) => {
  return isUsuarioAutenticado ? element : <Navigate to="/login"/>;
}

function Rotas() {

  const authContext = useContext(AuthContext);
  const {usuarioAutenticado, isAutenticado, iniciarSessao, encerrarSessao} = authContext;
  console.log('ROTAS is autenticado: ' + isAutenticado)
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<PrivateRoute isUsuarioAutenticado={isAutenticado} element={<Home/>}/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/cadastro-usuarios" element={<CadastroUsuario/>}/>
          <Route path="/consulta-lancamentos" element={<PrivateRoute isUsuarioAutenticado={isAutenticado}
                                                                     element={<ConsultaLancamentos/>}/>}/>
          <Route path="/cadastro-lancamentos/:id" element={<PrivateRoute isUsuarioAutenticado={isAutenticado}
                                                                         element={<CadastroLancamentos/>}/>}/>
        </Routes>
      </div>
    </Router>)
}

export default Rotas;