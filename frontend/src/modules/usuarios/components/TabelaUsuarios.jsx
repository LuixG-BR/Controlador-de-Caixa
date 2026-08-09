function TabelaUsuarios({ usuarios }) {

    if (!usuarios || usuarios.length === 0) {
        return (
            <div className="tabela-vazia">
                <p>Nenhum usuário encontrado.</p>
            </div>
        );
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Login</th>
                        <th>Perfil</th>
                        <th>Congregação</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td>{usuario.nome}</td>
                            <td>{usuario.login}</td>
                            <td>{usuario.perfil}</td>
                            <td>{usuario.congregacao}</td>
                            <td>
                                <span
                                    className={
                                        usuario.status
                                            ? "status ativo"
                                            : "status inativo"
                                    }
                                >
                                    {usuario.status
                                        ? "Ativo"
                                        : "Inativo"}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TabelaUsuarios;