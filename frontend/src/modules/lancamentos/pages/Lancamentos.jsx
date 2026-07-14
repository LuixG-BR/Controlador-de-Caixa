import { useEffect, useState } from "react";

import Modal from "../../../components/ui/Modal";

import CreditoForm from "../components/CreditoForm";
import DebitoForm from "../components/DebitoForm";
import TabelaLancamentos from "../components/TabelaLancamentos";

import lancamentoService from "../services/lancamentoService";

function Lancamentos() {

    const [openCredito, setOpenCredito] = useState(false);
    const [openDebito, setOpenDebito] = useState(false);

    const [lancamentos, setLancamentos] = useState([]);

    async function buscarLancamentos() {

        try {

            const dados = await lancamentoService.listar();

            setLancamentos(dados);

        } catch (erro) {
            console.error("Erro ao buscar lançamentos:", erro);
        }
    }

    useEffect(() => {
        buscarLancamentos();
    }, []);

    function sucessoCredito() {
        buscarLancamentos();
        setOpenCredito(false);
    }

    function sucessoDebito() {
        buscarLancamentos();
        setOpenDebito(false);
    }

    return (

        <div className="pagina-lancamentos">

            <div className="cabecalho-lancamentos">

                <h1>Controle de Caixa</h1>

                <div className="acoes">

                    <button
                        onClick={() => setOpenCredito(true)}
                    >
                        + Novo Crédito
                    </button>

                    <button
                        onClick={() => setOpenDebito(true)}
                    >
                        - Novo Débito
                    </button>
                </div>
            </div>

            <TabelaLancamentos
                lancamentos={lancamentos}
            />

            <Modal
                open={openCredito}
                onClose={() => setOpenCredito(false)}
                title="Novo Crédito"
            >
                <CreditoForm
                    onSuccess={sucessoCredito}
                />
            </Modal>

            <Modal
                open={openDebito}
                onClose={() => setOpenDebito(false)}
                title="Novo Débito"
            >
                <DebitoForm
                    onSuccess={sucessoDebito}
                />
            </Modal>
        </div>
    );
}

export default Lancamentos;