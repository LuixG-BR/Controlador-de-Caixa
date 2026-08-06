import api from "../../../api/api";

const congregacaoService = {

    async listar() {
        const resposta = await api.get("/congregacao/");
        return resposta.data;
    }

};

export default congregacaoService;