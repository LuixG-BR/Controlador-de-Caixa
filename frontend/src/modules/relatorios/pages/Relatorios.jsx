import { useState } from "react";

import FiltroRelatorio from "../components/FiltroRelatorio";
import ResumoRelatorio from "../components/ResumoRelatorio";
import PreviewRelatorio from "../components/PreviewRelatorio";

function Relatorios() {

    const [relatorio, setRelatorio] = useState(null);

    return (

        <div className="pagina-relatorios">

            <h1>Relatórios Financeiros</h1>

            <FiltroRelatorio
                setRelatorio={setRelatorio}
            />

            <ResumoRelatorio
                resumo={relatorio}
            />

            <PreviewRelatorio
                lancamentos={relatorio?.lancamentos}
            />

        </div>
    );
}

export default Relatorios;