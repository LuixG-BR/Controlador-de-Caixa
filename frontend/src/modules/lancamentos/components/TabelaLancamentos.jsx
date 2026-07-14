function TabelaLancamentos({ lancamentos }) {

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
                {lancamentos.map((item) => (
                    <tr key={item.id_lancamento}>
                        <td>{item.data}</td>
                        <td>{item.tipo}</td>
                        <td>{item.categoria}</td>
                        <td>{item.descricao}</td>
                        <td>{item.valor}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TabelaLancamentos;