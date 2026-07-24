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
            }
            catch (erro) {
                console.log(erro);
            }
        }
        carregarUsuario();
    }, []);

    function exportarPDF() {

        if (!relatorio) return;

        gerarRelatorioPDF({
            usuario: {
                nome: usuario,
                congregacao: congregacao
            },
            filtros,
            resumo: relatorio.resumo,
            lancamentos: relatorio.lancamentos
        });
    }

    return (

        <div className="pagina-relatorios">

            <h1>Relatórios Financeiros</h1>

            <FiltroRelatorio
                setRelatorio={setRelatorio}
                filtros={filtros}
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