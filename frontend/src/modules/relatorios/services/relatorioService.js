import api from "../../../api/api";

class RelatorioService {

    async gerarResumo(filtros){

        const resposta = await api.get(
            "/relatorios/resumo",
            {
                params: filtros
            }
        );

        return resposta.data;
    }
}

export default new RelatorioService();