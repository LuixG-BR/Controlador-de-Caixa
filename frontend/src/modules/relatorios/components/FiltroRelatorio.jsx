import { useState } from "react";

import relatorioService from "../services/relatorioService";
import notificacoes from "../../../utils/toast";
import SeletorCongregacao from "./SeletorCongregacao";

function FiltroRelatorio({ setRelatorio, setFiltros }) {

    const [filtro, setFiltro] = useState({
        data_inicio: "",
        data_fim: "",
        tipo: "",
        categoria: "",
        id_congregacao: ""
    });

    function handleChange(e) {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    }

    async function gerarResumo(e) {

        e.preventDefault();

        try {
            setFiltros(filtro)

            const dados = await relatorioService.gerarRelatorio(filtro);

            setRelatorio(dados);
            notificacoes.sucesso("Relatório carregado.");
        }
        catch (erro) {
            console.error(erro);
            notificacoes.erro("Erro ao carregar relatório.");
        }
    }

    return (
        <form onSubmit={gerarResumo} className="formulario">

            <h2>Filtros</h2>

            <div className="form-row">
                <div className="form-group">
                    <label>Data Inicial</label>
                    <input
                        type="date"
                        name="data_inicio"
                        value={filtro.data_inicio}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Data Final</label>
                    <input
                        type="date"
                        name="data_fim"
                        value={filtro.data_fim}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Tipo</label>
                    <select
                        name="tipo"
                        value={filtro.tipo}
                        onChange={handleChange}
                    >
                        <option value="">Todos</option>
                        <option value="credito">Crédito</option>
                        <option value="debito">Débito</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Categoria</label>
                    <input
                        type="text"
                        name="categoria"
                        value={filtro.categoria}
                        onChange={handleChange}
                    />
                </div>

                <SeletorCongregacao
                    valor={filtro.id_congregacao}
                    onChange={(valor) =>
                        setFiltro({
                            ...filtro,
                            id_congregacao: valor
                        })
                    }
                />
            </div>

            <div className="form-acoes">
                <button type="submit" className="btn btn-primary">Gerar Relatorio</button>
            </div>

        </form>
    );
}

export default FiltroRelatorio;