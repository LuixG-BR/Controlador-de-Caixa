import api from "../../../api/api";

class UsuarioService {

    async perfil() {
        const resposta = await api.get("/usuarios/me");
        return resposta.data;
    }

    async listar() {
        const resposta = await api.get("/usuarios/");
        return resposta.data;
    }

}

export default new UsuarioService();