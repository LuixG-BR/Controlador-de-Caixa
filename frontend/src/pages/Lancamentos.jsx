import CreditoForm from "../components/CreditoForm";
import DebitoForm from "../components/DebitoForm";


function Lancamentos() {

    return (

        <div>
            <h1>Lançamento</h1>

            <CreditoForm />
            <hr />
            <DebitoForm />
        </div>
    )
}

export default Lancamentos;