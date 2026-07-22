import api from "../../../api/api";

class RelatorioService {

    async gerarRelatorio(filtros = {}) {

        const filtrosLimpos = {};

        Object.keys(filtros).forEach((chave) => {

            if (
                filtros[chave] !== "" &&
                filtros[chave] !== null &&
                filtros[chave] !== undefined
            ) {
                filtrosLimpos[chave] = filtros[chave];
            }
        });

        const resposta = await api.get(
            "/relatorios/",
            {
                params: filtrosLimpos
            }
        );
        return resposta.data;
    }
}

export default new RelatorioService();