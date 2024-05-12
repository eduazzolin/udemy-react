import ApiService from "../apiService";
import ErroValidacao from "../exception/erroValidacao";

class LancamentosService extends ApiService {
  constructor() {
    super('/api/lancamentos');
  }

  consultar(lancamentoFiltro) {
    let params = new URLSearchParams();
    params.append('ano', lancamentoFiltro.ano);
    if (lancamentoFiltro.mes) params.append('mes', lancamentoFiltro.mes);
    if (lancamentoFiltro.tipo) params.append('tipo', lancamentoFiltro.tipo);
    if (lancamentoFiltro.status) params.append('status', lancamentoFiltro.status);
    if (lancamentoFiltro.descricao) params.append('descricao', lancamentoFiltro.descricao);
    if (lancamentoFiltro.usuario) params.append('usuario', lancamentoFiltro.usuario);

    const query = '?' + params.toString();
    console.log(query)
    return this.get(query);
  }

  obterListaMeses() {
    return [
      {label: 'Selecione', value: ''},
      {label: 'Janeiro', value: 1},
      {label: 'Fevereiro', value: 2},
      {label: 'Março', value: 3},
      {label: 'Abril', value: 4},
      {label: 'Maio', value: 5},
      {label: 'Junho', value: 6},
      {label: 'Julho', value: 7},
      {label: 'Agosto', value: 8},
      {label: 'Setembro', value: 9},
      {label: 'Outubro', value: 10},
      {label: 'Novembro', value: 11},
      {label: 'Dezembro', value: 12}
    ];
  }

  obterListaTipos() {
    return [
      {label: 'Selecione', value: ''},
      {label: 'Despesa', value: 'DESPESA'},
      {label: 'Receita', value: 'RECEITA'}
    ];
  }

  deletar(id) {
    return this.delete('/' + id);
  }

  salvar(lancamento) {
    return this.post('', lancamento);
  }

  obterPorId(id) {
    return this.get('/' + id);
  }

  atualizar(lancamento) {
    return this.put('/' + lancamento.id, lancamento);
  }


  validar(lancamento) {
    const erros = [];

    if (!lancamento.ano) {
      erros.push('Informe o Ano.');
    }
    if (!lancamento.mes) {
      erros.push('Informe o Mês.');
    }
    if (!lancamento.descricao) {
      erros.push('Informe a Descrição.');
    }
    if (!lancamento.valor) {
      erros.push('Informe o Valor.');
    }
    if (!lancamento.tipo) {
      erros.push('Informe o Tipo.');
    }


    if (erros && erros.length > 0) {
      throw new ErroValidacao(erros);
    }
  }

  alterarStatus(id, status) {
    return this.put(`/${id}/atualiza-status`, {status});
  }
}


export default LancamentosService