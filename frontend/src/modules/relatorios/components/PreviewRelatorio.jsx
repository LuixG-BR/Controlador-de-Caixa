function PreviewRelatorio({ lancamentos }) {

    function formatarData(data) {
        if (!data) return "-";

        const [ano, mes, dia] = data.split("-");
        return `${dia}/${mes}/${ano}`;
    }

    if (!lancamentos || lancamentos.length === 0) {
        return (
            <p>Nenhum lançamento encontrado.</p>
        );
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
                    </tr>
                </thead>

                <tbody>
                    {lancamentos.map((item, index) => (
                        <tr key={index}>
                            <td>
                                {formatarData(item.data)}
                            </td>
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
                                {Number(
                                    item.valor
                                ).toLocaleString(
                                    "pt-BR",
                                    {
                                        style: "currency",
                                        currency: "BRL"
                                    }
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PreviewRelatorio;