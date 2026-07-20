import { useState } from "react";

import FiltroRelatorio from "../components/FiltroRelatorio";
import ResumoRelatorio from "../components/ResumoRelatorio";

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
            
        </div>
    );
}

export default Relatorios;