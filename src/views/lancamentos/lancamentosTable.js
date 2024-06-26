import React from "react";

export default props => {
  const currencyFormat = new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'})


  const linhas = props.lancamentos.map((lancamento, idx) => {
    return (<tr key={lancamento.id}>
      <td>{lancamento.descricao}</td>
      <td>{currencyFormat.format(lancamento.valor)}</td>
      <td>{lancamento.tipo}</td>
      <td>{lancamento.mes}</td>
      <td>{lancamento.status}</td>
      <td>
        <button
          type="button" title={"Efetivar"}
          disabled={lancamento.status !== "PENDENTE"}
          className="btn btn-success mx-1"
          onClick={e => props.alterarStatus(lancamento, "EFETIVADO")}>
          <i className={"pi pi-check"}/>
        </button>
        <button
          type="button" title={"Cancelar"}
          disabled={lancamento.status !== "PENDENTE"}
          className="btn btn-dark mx-1"
          onClick={e => props.alterarStatus(lancamento, "CANCELADO")}>
          <i className={"pi pi-times"}/>

        </button>
        <button
          type="button" title={"Editar"}
          className="btn btn-primary mx-1"
          onClick={e => props.editAction(lancamento.id)}>
          <i className={"pi pi-pencil"}/>
        </button>
        <button
          type="button" title={"Deletar"}
          className="btn btn-danger mx-1"
          onClick={e => props.deleteAction(lancamento)}>
          <i className={"pi pi-trash"}/>
        </button>
      </td>
    </tr>)
  })

  return (<table className={"table table-hover"}>
    <thead>
    <tr>
      <th scope="col">Descrição</th>
      <th scope="col">Valor</th>
      <th scope="col">Tipo</th>
      <th scope="col">Mês</th>
      <th scope="col">Situação</th>
      <th scope="col">Ações</th>
    </tr>
    </thead>
    <tbody>
    {linhas}
    </tbody>
  </table>)
}