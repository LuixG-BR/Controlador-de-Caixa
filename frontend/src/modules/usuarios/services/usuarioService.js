import api from "../../../api/api";

class UsuarioService {

    async perfil() {
        const resposta = await api.get("/usuarios/me");
        return resposta.data;
    }

}

export default new UsuarioService();