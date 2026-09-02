import { Pencil, Trash, CaretLeft, CaretRight } from "@phosphor-icons/react";

function TabelaLancamentos({
    lancamentos = [],
    onEditar,
    onExcluir,

    paginaAtual = 1,
    totalPaginas = 1,
    totalRegistros = 0,

    onPaginaAnterior,
    onProximaPagina
}) {

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
                                {item.tipo}
                            </td>

                            <td>{item.categoria}</td>

                            <td>{item.descricao}</td>

                            <td
                                className={`valor ${item.tipo === "credito"
                                    ? "credito"
                                    : "debito"
                                    }`}
                            >
                                {Number(item.valor).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}

                            </td>

                            <td>
                                <div className="acoes">
                                    <button
                                        type="button"
                                        className="acao-icon editar"
                                        onClick={() => onEditar(item)}
                                        title="Editar lançamento"
                                    >
                                        <Pencil
                                            size={30}
                                            weight="regular"
                                        />
                                    </button>

                                    <button
                                        type="button"
                                        className="acao-icon excluir"
                                        onClick={() => onExcluir(item)}
                                        title="Excluir lançamento"
                                    >
                                        <Trash
                                            size={30}
                                            weight="regular"
                                        />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            <div className="paginacao">

                <span className="paginacao-total">
                    {totalRegistros} lançamento(s)
                </span>

                <div className="paginacao-controles">

                    <button
                        type="button"
                        className="paginacao-botao"
                        onClick={onPaginaAnterior}
                        disabled={paginaAtual <= 1}
                    >
                        <CaretLeft size={20} />
                        Anterior
                    </button>

                    <span className="paginacao-info">
                        Página {paginaAtual} de {totalPaginas}
                    </span>

                    <button
                        type="button"
                        className="paginacao-botao"
                        onClick={onProximaPagina}
                        disabled={
                            paginaAtual >= totalPaginas
                        }
                    >
                        Próxima
                        <CaretRight size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TabelaLancamentos;