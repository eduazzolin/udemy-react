import React, {useContext, useEffect, useState} from "react";
import UsuarioService from "../app/service/usuarioService";
import {AuthContext} from "../main/provedorAutenticacao";

function Home() {

  const [saldo, setSaldo] = useState(0);
  const usuarioService = new UsuarioService();
  const currencyFormat = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const usuarioLogado = authContext.usuarioAutenticado;

    usuarioService
      .obterSaldoPorUsuario(usuarioLogado.id)
      .then(response => {
        setSaldo(response.data);
      })
      .catch(error => {
        console.log(error.response)
      })
  }, []);

  return (<div className="p-5 mb-4 bg-light rounded-3">
    <h1 className="display-3">Bem vindo!</h1>
    <p className="lead">Esse é seu sistema de finanças.</p>
    <p className="lead">Seu saldo para o mês atual é de {currencyFormat.format(saldo)}</p>
    <hr className="my-4"/>
    <p>E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.</p>
    <p className="lead">

      <a
        className="btn btn-primary btn-lg"
        href="/cadastro-usuarios"
        role="button">
        <i className="pi pi-users"></i>
        Cadastrar Usuário
      </a>

      <a
        className="btn btn-danger btn-lg"
        href="/cadastro-lancamentos"
        role="button">
        <i className="pi pi-money-bill"></i>
        Cadastrar Lançamento
      </a>

    </p>
  </div>)
}

export default Home;