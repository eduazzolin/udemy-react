import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import { useNavigate } from 'react-router-dom'

function Login() {

  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const navigate = useNavigate();

  const entrar = () => {
    console.log('Email: ', email)
    console.log('Senha: ', senha)
  }

  const prepareCadastrar = () => {
    navigate('/cadastro-usuarios')
  }

  return (
    <div className="row">
      <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
        <div className="bs-docs-section">
          <Card title="Login">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <fieldset style={{display: 'flex', flexDirection: 'column', gap: 10}}>
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
                      <button className="btn btn-danger" onClick={prepareCadastrar}>Cadastrar</button>
                      <button className="btn btn-success" onClick={entrar}>Entrar</button>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Login;