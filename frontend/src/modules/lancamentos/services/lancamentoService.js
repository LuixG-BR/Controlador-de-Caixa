import api from "../../../api/api";

class LancamentoService {

    async listar(filtros = {}) {
        const filtrosLimpos = Object.fromEntries(
            Object.entries(filtros).filter(
                ([, valor]) =>
                    valor !== "" &&
                    valor !== null &&
                    valor !== undefined
            )
        );

        const resposta = await api.get(
            "/lancamentos/",
            {
                params: filtrosLimpos
            }
        );
        return resposta.data;
    }

    async criar(dados) {
        const resposta = await api.post(
            "/lancamentos/",
            dados
        );
        return resposta.data;
    }

    async editar(id, dados) {
        const resposta = await api.put(
            `/lancamentos/${id}`,
            dados
        );
        return resposta.data;
    }

    async excluir(id) {
        const resposta = await api.delete(
            `/lancamentos/${id}`
        );
        return resposta.data;
    }
}

export default new LancamentoService();