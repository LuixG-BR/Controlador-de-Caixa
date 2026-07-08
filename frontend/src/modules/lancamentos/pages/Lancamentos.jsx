import CreditoForm from "../components/CreditoForm";
import DebitoForm from "../components/DebitoForm";
import TabelaLancamentos from "../components/TabelaLancamentos";


function Lancamentos() {

    return (

        <div>
            <h1>Lançamento</h1>

            <CreditoForm />
            <hr />
            <DebitoForm />
            <hr />
            <TabelaLancamentos />
        </div>
    )
}

export default Lancamentos;