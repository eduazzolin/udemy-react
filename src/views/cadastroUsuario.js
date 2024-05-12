import React, {useState} from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";
import {useNavigate} from 'react-router-dom';
import UsuarioService from "../app/service/usuarioService";
import {mensagemErro, mensagemSucesso} from "../components/toastr";
import LocalStorageService from "../app/service/localStorageService";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepeticao, setSenhaRepeticao] = useState("");

  const navigate = useNavigate();
  const service = new UsuarioService();

  const cadastrar = () => {
    const usuario = {
      nome: nome,
      email: email,
      senha: senha,
      senhaRepeticao: senhaRepeticao
    };

    try {
      service.validar(usuario);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach(msg => mensagemErro(msg));
      return false;
    }

    service
      .salvar(usuario)
      .then(response => {
        mensagemSucesso('Cadastro realizado com sucesso! Faça o login para acessar o sistema.');
        navigate("/login")
      })
      .catch(error => {
        mensagemErro(error.response.data)
      })

  }

  return (
    <div className="row">
      <div className="col-md-6" style={{position: "relative", left: "300px"}}>
        <div className="bs-docs-section">
          <Card title="Cadastro de usuário">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <fieldset>
                    <FormGroup label="Nome: *" htmlFor="inputNome">
                      <input
                        type="text"
                        id="inputNome"
                        className="form-control"
                        name="nome"
                        onChange={e => setNome(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup label="Email: *" htmlFor="inputEmail">
                      <input
                        type="email"
                        id="inputEmail"
                        className="form-control"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup label="Senha: *" htmlFor="inputSenha">
                      <input
                        type="password"
                        id="inputSenha"
                        className="form-control"
                        name="senha"
                        onChange={e => setSenha(e.target.value)}
                      />
                    </FormGroup>
                    <FormGroup label="SenhaRepeticao: *" htmlFor="inputSenhaRepeticao">
                      <input
                        type="password"
                        id="inputSenhaRepeticao"
                        className="form-control"
                        name="senhaRepeticao"
                        onChange={e => setSenhaRepeticao(e.target.value)}
                      />
                    </FormGroup>
                    <div className="mt-3" style={{display: "flex", gap: 10, justifyContent: "end"}}>
                      <button
                        className="btn btn-danger"
                        onClick={() => navigate('/login')}>
                        <i className={"pi pi-times"}/> Voltar
                      </button>
                      <button
                        className="btn btn-success"
                        onClick={cadastrar}>
                        <i className={"pi pi-save"}/> Cadastrar
                      </button>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CadastroUsuario;