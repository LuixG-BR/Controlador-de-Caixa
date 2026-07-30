import notificacoes from "../../../utils/toast";
import lancamentoService from "../services/lancamentoService";

function DeleteForm({ lancamento, onSuccess, onCancel }) {

    async function handleDelete() {

        if (!lancamento) return;

        try {
            await lancamentoService.excluir(lancamento.id_lancamento);

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
                <>
                    <hr />

                    <p>
                        <strong>Tipo:</strong> {lancamento.tipo}
                    </p>

                    <p>
                        <strong>Categoria:</strong> {lancamento.categoria}
                    </p>

                    <p>
                        <strong>Descrição:</strong> {lancamento.descricao || "-"}
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
                </>
            )}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "flex-end",
                    marginTop: "20px"
                }}
            >
                <button
                    type="button"
                    onClick={onCancel}
                >
                    Cancelar
                </button>

                <button
                    type="button"
                    onClick={handleDelete}
                    
                >
                    Excluir
                </button>
            </div>
        </div>
    );
}

export default DeleteForm;