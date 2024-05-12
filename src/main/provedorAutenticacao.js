import React from "react";
import AuthService from "../app/service/authService";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;
const AuthProvider = AuthContext.Provider;


function ProvedorAutenticacao(props) {

  const [usuarioAutenticado, setUsuarioAutenticado] = React.useState(null);
  const [isAutenticado, setIsAutenticado] = React.useState(false);

  const iniciarSessao = (usuario) => {
    AuthService.logar(usuario);
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