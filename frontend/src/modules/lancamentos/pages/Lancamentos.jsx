import { useEffect, useState } from "react";

import Modal from "../../../components/ui/Modal";

import CreditoForm from "../components/CreditoForm";
import DebitoForm from "../components/DebitoForm";
import DeleteForm from "../components/DeleteForm";
import TabelaLancamentos from "../components/TabelaLancamentos";
import ResumoFinanceiro from "../components/ResumoFinanceiro";
import FiltroLancamentos from "../components/FiltroLancamentos";

import lancamentoService from "../services/lancamentoService";
import notificacoes from "../../../utils/toast";

function Lancamentos() {

    const [lancamentos, setLancamentos] = useState([]);

    const [openCredito, setOpenCredito] = useState(false);
    const [openDebito, setOpenDebito] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [lancamentoSelecionado, setLancamentoSelecionado] = useState(null);

    async function buscarLancamentos(filtros = {}) {

        try {
            const dados = await lancamentoService.listar(filtros);
            setLancamentos(dados);
        } catch (erro) {
            console.error(erro);
            notificacoes.erro("Erro ao carregar os lançamentos");
        }
    }

    useEffect(() => {
        buscarLancamentos();
    }, []);

    function novoCredito() {
        setLancamentoSelecionado(null);
        setOpenCredito(true);
    }

    function novoDebito() {
        setLancamentoSelecionado(null);
        setOpenDebito(true);
    }

    function editarLancamento(item) {

        setLancamentoSelecionado(item);

        if (item.tipo === "credito") {
            setOpenCredito(true);
        } else {
            setOpenDebito(true);
        }
    }

    function confirmarExclusao(item) {
        setLancamentoSelecionado(item);
        setOpenDelete(true);
    }

    function fecharCredito() {
        setOpenCredito(false);
        setLancamentoSelecionado(null);
    }

    function fecharDebito() {
        setOpenDebito(false);
        setLancamentoSelecionado(null);
    }

    function fecharDelete() {
        setOpenDelete(false);
        setLancamentoSelecionado(null);
    }

    return (

        <div className="pagina-lancamentos">

            <div className="cabecalho-lancamentos">

                <h1>Controle de Caixa</h1>

                <div className="acoes">
                    <button onClick={novoCredito} className="btn btn-success">
                        + Novo Crédito
                    </button>

                    <button onClick={novoDebito} className="btn btn-danger">
                        - Novo Débito
                    </button>
                </div>
            </div>

            <ResumoFinanceiro
                lancamentos={lancamentos}
            />

            <FiltroLancamentos
                onFiltrar={buscarLancamentos}
                onLimpar={() => buscarLancamentos()}
            />

            <TabelaLancamentos
                lancamentos={lancamentos}
                onEditar={editarLancamento}
                onExcluir={confirmarExclusao}
            />

            <Modal
                open={openCredito}
                onClose={fecharCredito}
                title={
                    lancamentoSelecionado ? "Editar Crédito" : "Novo Crédito"
                }
            >
                <CreditoForm
                    lancamento={lancamentoSelecionado}
                    onSuccess={() => {
                        buscarLancamentos();
                        fecharCredito();
                    }}
                />
            </Modal>

            <Modal
                open={openDebito}
                onClose={fecharDebito}
                title={
                    lancamentoSelecionado ? "Editar Débito" : "Novo Débito"
                }
            >
                <DebitoForm
                    lancamento={lancamentoSelecionado}
                    onSuccess={() => {
                        buscarLancamentos();
                        fecharDebito();
                    }}
                />
            </Modal>

            <Modal
                open={openDelete}
                onClose={fecharDelete}
                title="Excluir lançamento"
            >
                <DeleteForm
                    lancamento={lancamentoSelecionado}
                    onSuccess={() => {
                        buscarLancamentos();
                        fecharDelete();
                    }}
                    onCancel={fecharDelete}
                />
            </Modal>
        </div>
    );
}

export default Lancamentos;