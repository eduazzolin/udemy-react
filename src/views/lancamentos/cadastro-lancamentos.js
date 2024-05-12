import React, {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import SelectMenu from "../../components/selectMenu";
import LancamentosService from "../../app/service/lancamentosService";
import * as messages from "../../components/toastr";
import LocalStorageService from "../../app/service/localStorageService";
import {useParams} from 'react-router-dom';

export default function CadastroLancamentos() {

  const navigate = useNavigate();
  const service = new LancamentosService();
  const tipos = service.obterListaTipos();
  const meses = service.obterListaMeses();
  const usuarioLogado = LocalStorageService.obterItem('_usuario_logado');

  const [id, setId] = React.useState(null);
  const [descricao, setDescricao] = React.useState('');
  const [valor, setValor] = React.useState('');
  const [mes, setMes] = React.useState('');
  const [ano, setAno] = React.useState('');
  const [tipo, setTipo] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [usuario, setUsuario] = React.useState('');
  const [atualizando, setAtualizando] = React.useState(false);


  let {id: paramId} = useParams();
  useEffect(() => {
    if (paramId) {
      service.obterPorId(paramId)
        .then(response => {
          setId(response.data.id);
          setDescricao(response.data.descricao);
          setValor(response.data.valor);
          setMes(response.data.mes);
          setAno(response.data.ano);
          setTipo(response.data.tipo);
          setStatus(response.data.status);
          setUsuario(response.data.usuario);
          setAtualizando(true);
        }).catch(error => {
        messages.mensagemErro(error.response.data);
      })
    }
  }, []);

  const submit = () => {
    const lancamento = {
      descricao,
      valor,
      mes,
      ano,
      tipo,
      usuario: usuarioLogado.id
    }

    try {
      service.validar(lancamento);
    } catch (erro) {
      const msgs = erro.mensagens;
      msgs.forEach(msg => messages.mensagemErro(msg));
      return false;
    }


    service.salvar(lancamento)
      .then(response => {
        messages.mensagemSucesso('Lançamento cadastrado com sucesso!');
        navigate('/consulta-lancamentos');
      }).catch(error => {
      messages.mensagemErro(error.response.data);
    })
  }

  const atualizar = () => {
    const lancamento = {
      id,
      descricao,
      valor,
      mes,
      ano,
      tipo,
      status,
      usuario
    }
    service.atualizar(lancamento)
      .then(response => {
        messages.mensagemSucesso('Lançamento atualizado com sucesso!');
        navigate('/consulta-lancamentos');
      }).catch(error => {
      messages.mensagemErro(error.response.data);
    })

  }

  return (
    <Card title={atualizando ? "Atualização de lançamento" : "Cadastro de lançamento"}>
      <div className={'row'}>
        <div className={'col-md-12'}>
          <FormGroup id={"inputDescricao"} label={"Descrição: *"}>
            <input id={"inputDescricao"} type={"text"} className={"form-control"} value={descricao}
                   onChange={(e) => setDescricao(e.target.value)}/>
          </FormGroup>
        </div>
      </div>

      <div className={'row'}>
        <div className={'col-md-6'}>
          <FormGroup id={"inputAno"} label={"Ano: *"}>
            <input id={"inputAno"} type={"text"} className={"form-control"} value={ano}
                   onChange={(e) => setAno(e.target.value)}/>
          </FormGroup>
        </div>
        <div className={'col-md-6'}>
          <FormGroup id={"inputMes"} label={"Mês: *"}>
            <SelectMenu id={"inputMes"} className={"form-control"} lista={meses} value={mes}
                        onChange={(e) => setMes(e.target.value)}/>
          </FormGroup>
        </div>
      </div>

      <div className={'row'}>
        <div className={'col-md-4'}>
          <FormGroup id={"inputValor"} label={"Valor: *"}>
            <input id={"inputValor"} type={"text"} className={"form-control"} value={valor}
                   onChange={(e) => setValor(e.target.value)}/>
          </FormGroup>
        </div>
        <div className={'col-md-4'}>
          <FormGroup id={"inputTipo"} label={"Tipo: *"}>
            <SelectMenu id={"inputTipo"} className={"form-control"} lista={tipos} value={tipo}
                        onChange={(e) => setTipo(e.target.value)}/>
          </FormGroup>
        </div>
        <div className={'col-md-4'}>
          <FormGroup id={"inputStatus"} label={"Status: *"}>
            <input id={"inputStatus"} type={"text"} className={"form-control"} disabled value={status}/>
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 " style={{display: 'flex', gap: 10, justifyContent: 'end'}}>
          <button className={'btn btn-danger'} onClick={() => navigate('/consulta-lancamentos')}><i className={"pi pi-times"}/> Cancelar
          </button>
          {
            atualizando ?
              <button className={'btn btn-success'} onClick={atualizar}><i className={"pi pi-refresh"}/> Atualizar</button>
              :
              <button className={'btn btn-success'} onClick={submit}><i className={"pi pi-plus"}/> Cadastrar</button>
          }


        </div>
      </div>

    </Card>
  )
}