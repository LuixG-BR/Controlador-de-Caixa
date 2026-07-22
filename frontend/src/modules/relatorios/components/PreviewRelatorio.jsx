function PreviewRelatorio({ lancamentos }) {

    if (!lancamentos || lancamentos.length === 0) {
        return (
            <p>Nenhum lançamento encontrado.</p>
        );
    }

    return (
        <table>
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
                            {new Date(item.data).toLocaleDateString("pt-BR")}
                        </td>
                        <td>{item.tipo}</td>
                        <td>{item.categoria}</td>
                        <td>{item.descricao}</td>
                        <td>
                            R$ {
                                Number(item.valor).toLocaleString(
                                    "pt-BR",
                                    {
                                        minimumFractionDigits:2
                                    }
                                )
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default PreviewRelatorio;