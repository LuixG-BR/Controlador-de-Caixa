import "../../../components/Table.css";
function TabelaLancamentos({ lancamentos, onEditar, onExcluir }) {
    return (
        <div className="tabela-container">
            <table>
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
                            <td>{new Date(item.data).toLocaleDateString("pt-BR")}</td>
                            <td>{item.tipo}</td>
                            <td>{item.categoria}</td>
                            <td>{item.descricao}</td>
                            <td>{Number(item.valor).toLocaleString("pt-BR",
                                { style: "currency", currency: "BRL" })}
                            </td>
                            <td>
                                <button onClick={() => onEditar(item)}>✏️</button>
                                <button onClick={() => onExcluir(item)}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaLancamentos;