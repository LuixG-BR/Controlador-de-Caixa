import { Pencil, Trash } from "@phosphor-icons/react";

function TabelaLancamentos({ lancamentos, onEditar, onExcluir }) {

    function formatarData(data) {
        if (!data) return "-";

        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {lancamentos.map((item) => (
                        <tr key={item.id_lancamento}>
                            <td>{formatarData(item.data)}</td>
                            <td
                                className={`tipo ${item.tipo === "credito"
                                    ? "credito"
                                    : "debito"
                                    }`}
                            >
                                {item.tipo}</td>
                            <td>{item.categoria}</td>
                            <td>{item.descricao}</td>
                            <td
                                className={`valor ${item.tipo === "credito"
                                    ? "credito"
                                    : "debito"
                                    }`}
                            >
                                {Number(item.valor).toLocaleString("pt-BR",
                                    { style: "currency", currency: "BRL" })}
                            </td>
                            <td>

                                <div className="acoes">

                                    <button
                                        type="button"
                                        className="acao-icon editar"
                                        onClick={() => onEditar(item)}
                                        title="Editar lançamento"
                                    >
                                        <Pencil size={30} weight="regular" />
                                    </button>

                                    <button
                                        type="button"
                                        className="acao-icon excluir"
                                        onClick={() => onExcluir(item)}
                                        title="Excluir lançamento"
                                    >
                                        <Trash size={30} weight="regular" />
                                    </button>

                                </div>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaLancamentos;