import notificacoes from "../../../utils/toast";
import lancamentoService from "../services/lancamentoService";

function DeleteForm({ lancamento, onSuccess, onCancel }) {

    async function handleDelete() {

        if (!lancamento) return;

        try {
            await lancamentoService.excluir(
                lancamento.id_lancamento
            );

            notificacoes.sucesso("Lançamento excluído com sucesso!");

            if (onSuccess) {
                onSuccess();
            }
        } catch (erro) {
            console.error(erro);
            notificacoes.erro("Erro ao excluir lançamento.");
        }
    }

    return (
        <div className="delete-form">

            <p>
                Deseja realmente excluir este lançamento?
            </p>

            {lancamento && (

                <div className="delete-info">

                    <hr />

                    <p>
                        <strong>Tipo:</strong>{" "}
                        {lancamento.tipo}
                    </p>

                    <p>
                        <strong>Categoria:</strong>{" "}
                        {lancamento.categoria}
                    </p>

                    <p>
                        <strong>Descrição:</strong>{" "}
                        {lancamento.descricao || "-"}
                    </p>

                    <p>
                        <strong>Valor:</strong>{" "}
                        {Number(lancamento.valor).toLocaleString(
                            "pt-BR",
                            {
                                style: "currency",
                                currency: "BRL"
                            }
                        )}
                    </p>

                    <hr />

                </div>

            )}

            <div className="delete-acoes">

                <button
                    type="button"
                    onClick={onCancel}
                    className="btn btn-secondary"
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-danger"
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default DeleteForm;