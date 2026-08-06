import api from "../../../api/api";

class CongregacaoService {

    async listar() {

        const resposta =
            await api.get("/congregacao/");

        return resposta.data;
    }
}

export default new CongregacaoService();