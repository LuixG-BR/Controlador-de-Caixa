import api from "../../../api/api";

const dashboardService = {

    async listarLancamentos(idCongregacao = null) {

        const params = {};

        if (idCongregacao !== null) {
            params.id_congregacao = idCongregacao;
        }

        const resposta = await api.get(
            "/lancamentos/",
            { params }
        );

        return resposta.data;
    }
};

export default dashboardService;