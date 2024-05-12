import React, {useContext} from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {useNavigate} from 'react-router-dom'
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from '../components/toastr'
import {AuthContext} from "../main/provedorAutenticacao";

function Login() {
  const authContext = useContext(AuthContext);
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const navigate = useNavigate();

  const service = new UsuarioService();

  const entrar = () => {
    service
      .autenticar({
        email: email, senha: senha
      })
      .then(response => {
        mensagemSucesso('Bem vindo!');
        authContext.iniciarSessao(response.data)
        navigate("/home")
      })
      .catch(error => {
        mensagemErro(error.response.data)
      })
  }

  const prepareCadastrar = () => {
    navigate('/cadastro-usuarios')
  }

  return (<div className="row">
    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
      <div className="bs-docs-section">
        <Card title="Login">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <fieldset>
                  <FormGroup label="Email: *" htmlFor="exampleInputEmail1">
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Digite o Email"
                    />
                  </FormGroup>
                  <FormGroup label="Senha: *" htmlFor="exampleInputPassword1">
                    <input
                      type="password"
                      value={senha}
                      onChange={e => setSenha(e.target.value)}
                      className="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </FormGroup>
                  <div style={{display: 'flex', gap: 10, justifyContent: 'end'}}>
                    <button
                      className="btn btn-danger"
                      onClick={prepareCadastrar}>
                      <i className={"pi pi-plus"}/> Cadastrar
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={entrar}>
                      <i className={"pi pi-sign-in"}/> Entrar
                    </button>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  </div>)
}

export default Login;