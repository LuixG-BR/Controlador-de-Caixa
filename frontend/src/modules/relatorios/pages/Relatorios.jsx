import { useState } from "react";

import FiltroRelatorio from "../components/FiltroRelatorio";
import ResumoRelatorio from "../components/ResumoRelatorio";
import PreviewRelatorio from "../components/PreviewRelatorio";

function Relatorios() {

    const [resumo, setResumo] = useState(null);

    return (

        <div className="pagina-relatorios">

            <h1>Relatórios Financeiros</h1>

            <FiltroRelatorio
                setResumo={setResumo}
            />

            <ResumoRelatorio
                resumo={resumo}
            />

            <PreviewRelatorio
                lancamentos={relatorio?.lancamentos}
            />

        </div>
    );
}

export default Relatorios;