import React from "react";
import AuthService from "../app/service/authService";
import ApiService from "../app/apiService";
import {jwtDecode} from 'jwt-decode'

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;


function ProvedorAutenticacao(props) {

  const isUserAuthenticated = AuthService.isUsuarioAutenticado();

  const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(() => {
    if (isUserAuthenticated) {
      return AuthService.refreshSession();
    }
    return null;
  });
  const [isAutenticado, setIsAutenticado] = React.useState(isUserAuthenticated);



  const iniciarSessao = (tokenDTO) => {
    const token = tokenDTO.token;
    const claims = jwtDecode(token);
    const usuario = {
      nome: claims.nome,
      email: claims.sub,
      id: claims.id
    }

    AuthService.logar(usuario, token);
    setUsuarioAutenticado(usuario);
    setIsAutenticado(true);
  }

  const encerrarSessao = () => {
    AuthService.removerUsuarioAutenticado();
    setUsuarioAutenticado(null);
    setIsAutenticado(false);
  }

  const contexto = {
    usuarioAutenticado: usuarioAutenticado,
    isAutenticado: isAutenticado,
    iniciarSessao: iniciarSessao,
    encerrarSessao: encerrarSessao
  }


  return (
    <AuthProvider value={contexto}>
      {props.children}
    </AuthProvider>
  );
}

export default ProvedorAutenticacao;