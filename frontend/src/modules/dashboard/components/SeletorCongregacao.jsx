import { useEffect, useState } from "react";

import { useAuth } from "../../../auth/AuthContext";
import congregacaoService from "../../congregacoes/services/congregacaoService";


function SeletorCongregacao({ valor, onChange }) {

    const { usuario } = useAuth();
    const [congregacoes, setCongregacoes] = useState([]);

    useEffect(() => {
        async function carregarCongregacoes() {

            try {
                const dados =
                    await congregacaoService.listar();

                const ativas = dados.filter(
                    (congregacao) =>
                        congregacao.status === true
                );
                setCongregacoes(ativas);
            } catch (erro) {
                console.error(
                    "Erro ao carregar congregações:",
                    erro
                );
            }
        }
        if (usuario?.id_perfil === 1) {
            carregarCongregacoes();
        }
    }, [usuario]);

    if (usuario?.id_perfil !== 1) {
        return null;
    }

    return (

        <div className="form-group">
            <label htmlFor="congregacao">
                Congregação
            </label>
            <select
                id="congregacao"
                value={valor ?? ""}
                onChange={(e) => {
                    const valorSelecionado =
                        e.target.value === ""
                            ? null
                            : Number(e.target.value);
                    onChange(valorSelecionado);
                }}
            >
                <option value="">
                    Todas as congregações
                </option>
                {congregacoes.map((congregacao) => (
                    <option
                        key={congregacao.id_congregacao}
                        value={congregacao.id_congregacao}
                    >
                        {congregacao.nome}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SeletorCongregacao;