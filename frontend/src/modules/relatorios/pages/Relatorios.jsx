import { useEffect, useState } from "react";

import FiltroRelatorio from "../components/FiltroRelatorio";
import ResumoRelatorio from "../components/ResumoRelatorio";
import PreviewRelatorio from "../components/PreviewRelatorio";
import CardAcoesRelatorio from "../components/cardAcoesRelatorio";
import gerarRelatorioPDF from "../../../utils/pdf/gerarRelatorioPDF";
import usuarioService from "../../usuarios/services/usuarioService";
import notificacoes from "../../../utils/toast";

function Relatorios() {

    const [relatorio, setRelatorio] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [filtros, setFiltros] = useState({
        tipo: "",
        categoria: "",
        descricao: "",
        data_inicio: "",
        data_fim: ""
    });

    useEffect(() => {
        async function carregarUsuario() {
            try {
                const dados = await usuarioService.perfil();
                setUsuario(dados);
            } catch (erro) {
                console.error(erro);
            }
        }
        carregarUsuario();
    }, []);

    function exportarPDF() {

        if (!relatorio) return;

        gerarRelatorioPDF(
            relatorio,
            usuario,
            filtros
        );
    }

    return (

        <div className="pagina-relatorios">

            <h1>Relatórios Financeiros</h1>

            <FiltroRelatorio
                setRelatorio={setRelatorio}
                setFiltros={setFiltros}
            />

            <ResumoRelatorio
                resumo={relatorio}
            />

            <PreviewRelatorio
                lancamentos={relatorio?.lancamentos}
            />

            <CardAcoesRelatorio
                relatorio={relatorio}
                exportarPDF={exportarPDF}
            />

        </div>
    );
}

export default Relatorios;