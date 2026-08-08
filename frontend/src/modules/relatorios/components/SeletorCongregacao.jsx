import { useEffect, useState } from "react";

import congregacaoService from "../../congregacoes/services/congregacaoService";

function SeletorCongregacaoRelatorio({ valor, onChange }) {

    const [congregacoes, setCongregacoes] = useState([]);

    useEffect(() => {

        async function carregarCongregacoes() {

            try {
                const dados = await congregacaoService.listar();
                setCongregacoes(dados);
            } catch (erro) {
                console.error(
                    "Erro ao carregar congregações:",
                    erro
                );
            }
        }

        carregarCongregacoes();
    }, []);

    return (

        <div className="form-group">

            <label htmlFor="id_congregacao">
                Congregação
            </label>

            <select
                id="id_congregacao"
                name="id_congregacao"
                value={valor ?? ""}
                onChange={(evento) => {

                    const valorSelecionado = evento.target.value;

                    onChange(
                        valorSelecionado === ""
                            ? null
                            : Number(valorSelecionado)
                    );
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

export default SeletorCongregacaoRelatorio;