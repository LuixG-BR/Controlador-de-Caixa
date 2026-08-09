import { useEffect, useState } from "react";

import usuarioService from "../services/usuarioService";
import notificacoes from "../../../utils/toast";

import TabelaUsuarios from "../components/TabelaUsuarios";


function Usuarios() {

    const [usuarios, setUsuarios] = useState([]);
    const [carregando, setCarregando] = useState(true);

    async function carregarUsuarios() {
        try {
            setCarregando(true);

            const dados = await usuarioService.listar();
            setUsuarios(dados);
        }
        catch (erro) {
            console.error(erro);
            notificacoes.erro("Erro ao carregar usuários.");
        }
        finally {
            setCarregando(false);
        }
    }

    useEffect(() => {
        carregarUsuarios();
    }, []);

    return (
        <div className="pagina-usuarios">
            <div className="cabecalho-pagina">
                <div>
                    <h1>Usuários</h1>
                    <p>Usuários cadastrados no sistema</p>
                </div>
            </div>

            {carregando ? (
                <p className="estado-carregando">
                    Carregando usuários...
                </p>

            ) : (
                <TabelaUsuarios
                    usuarios={usuarios}
                />
            )}
        </div>
    );
}

export default Usuarios;