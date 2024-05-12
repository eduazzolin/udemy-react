import React, {useState} from "react";
import Card from "../../components/card";
import FormGroup from "../../components/form-group";
import {useNavigate} from 'react-router-dom';
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentosService from "../../app/service/lancamentosService"
import LocalStorageService from "../../app/service/localStorageService";
import * as messages from '../../components/toastr'
import {Button} from "primereact/button";
import {Dialog} from 'primereact/dialog';
import {useEffect} from "react";

function ConsultaLancamentos() {

  const [ano, setAno] = useState('');
  const [mes, setMes] = useState('');
  const [tipo, setTipo] = useState('');
  const [lancamentos, setLancamentos] = useState([])
  const [descricao, setDescricao] = useState('')
  const [visibleConfirmDialog, setVisibleConfirmDialog] = useState(false);
  const [lancamentoDeletar, setLancamentoDeletar] = useState({});
  const navigate = useNavigate();
  const service = new LancamentosService()

  const listaMeses = service.obterListaMeses()
  const listaTipos = service.obterListaTipos()

  const buscar = () => {
    if (!ano) {
      messages.mensagemErro("O preenchimento do campo ano é obrigatório.")
      return false
    }

    const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')
    const lancamentoFiltro = {
      ano: ano,
      mes: mes,
      tipo: tipo,
      descricao: descricao,
      usuario: usuarioLogado.id
    }
    console.log(lancamentoFiltro)

    service.consultar(lancamentoFiltro)
      .then(response => {
        const lista = response.data;
        if (lista.length < 1) {
          messages.mensagemAlerta("Nenhum resultado encontrado.")
        }
        setLancamentos(lista)
      })
      .catch(error => {
        messages.mensagemErro(error)
      })

  }

  const editar = (id) => {
    navigate(`/cadastro-lancamentos/${id}`)
  }

  const abrirConfirmacao = (lancamento) => {
    setVisibleConfirmDialog(true)
    setLancamentoDeletar(lancamento)
  }

  const cancelarDelecao = () => {
    setVisibleConfirmDialog(false)
    setLancamentoDeletar({})
  }

  const remover = () => {
    service
      .deletar(lancamentoDeletar.id)
      .then(responde => {
        const idx = lancamentos.indexOf(lancamentoDeletar)
        const novoLancamentos = lancamentos.toSpliced(idx, 1)
        setLancamentos(novoLancamentos)
        messages.mensagemSucesso("Lançamento removido com sucesso!")
      })
      .catch(error => {
        messages.mensagemErro("Erro ao remover lançamento.")
      });
    setVisibleConfirmDialog(false)
  }

  const alterarStatus = (lancamento, status) => {
    service
      .alterarStatus(lancamento.id, status)
      .then(response => {
        const idx = lancamentos.indexOf(lancamento)
        lancamento['status'] = status
        const novoLancamentos = lancamentos.toSpliced(idx, 1, lancamento)
        setLancamentos(novoLancamentos)
        messages.mensagemSucesso("Status atualizado com sucesso!")
      })
  }

  const footerContent = (
    <div>
      <Button label="Cancelar" icon="pi pi-times" onClick={cancelarDelecao} className="p-button-text"/>
      <Button label="Remover" severity="danger" icon="pi pi-check" onClick={remover} autoFocus/>
    </div>
  );
  return (
    <Card title={"Consulta Lançamentos"}>
      <div className={"row"}>
        <div className="col-md-4">
          <FormGroup label={"Ano: *"} htmlFor={"inputAno"}>
            <input
              type="text"
              className="form-control"
              id="inputAno"
              aria-describedby="emailHelp"
              placeholder="Digite o Ano"
              value={ano}
              onChange={e => setAno(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label={"Mês: "} htmlFor={"inputMes"}>
            <SelectMenu
              id={"inputMes"}
              className={'form-control'}
              lista={listaMeses}
              value={mes}
              onChange={e => setMes(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="col-md-4">
          <FormGroup label={"Tipo Lançamento: "} htmlFor={"inputMes"}>
            <SelectMenu
              id={"inputTipo"}
              className={'form-control'}
              lista={listaTipos}
              value={tipo}
              onChange={e => setTipo(e.target.value)}
            />
          </FormGroup>
        </div>
      </div>
      <div className={"row"}>
        <div className="col-md-12">
          <FormGroup label={"Descrição: "} htmlFor={"inputDescricao"}>
            <input
              type="text"
              className="form-control"
              id="inputDescrição"
              placeholder="Digite a Descrição"
              value={descricao}
              onChange={e => setDescricao(e.target.value)}
            />
          </FormGroup>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div style={{display: 'flex', gap: 10, justifyContent: 'end'}}>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => navigate('/cadastro-lancamentos')}>
               <i className={"pi pi-plus"}/> Cadastrar
            </button>
            <button
              type="button"
              className="btn btn-success"
              onClick={buscar}>
               <i className={"pi pi-search"}/> Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12">
          <div className="bs-component mt-4">

            <LancamentosTable
              lancamentos={lancamentos}
              deleteAction={abrirConfirmacao}
              editAction={editar}
              alterarStatus={alterarStatus}
            >

            </LancamentosTable>

          </div>
        </div>
      </div>
      <div>
        <Dialog
          header="Confirmar remoção"
          visible={visibleConfirmDialog}
          style={{width: '30vw'}}
          footer={footerContent}
          onHide={() => setVisibleConfirmDialog(false)}>
          <p className="m-0">
            Tem certeza que deseja remover este lançamento?
          </p>

        </Dialog>
      </div>
    </Card>
  )


}

export default ConsultaLancamentos