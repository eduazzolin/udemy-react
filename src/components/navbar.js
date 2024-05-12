import React, {useContext} from "react";
import NavBarItem from "./navBarItem";
import AuthService from "../app/service/authService";
import {useNavigate, Link} from 'react-router-dom'
import {AuthContext} from "../main/provedorAutenticacao";



function Navbar() {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container">
        <Link to={"/home"} className="navbar-brand">Minhas Finanças</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarResponsive">
          <ul className="navbar-nav">
            <NavBarItem render={authContext.isAutenticado} to={"/cadastro-usuarios"} label="Usuários"/>
            <NavBarItem render={authContext.isAutenticado} to={"/consulta-lancamentos"} label="Lançamentos"/>
            <NavBarItem render={authContext.isAutenticado} onClick={authContext.encerrarSessao} to={"/login"} label="Sair"/>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Navbar