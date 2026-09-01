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

import { useCongregacao } from "../../../context/CongregacaoContext";


function Lancamentos() {

    const [lancamentos, setLancamentos] = useState([]);

    const [openCredito, setOpenCredito] = useState(false);
    const [openDebito, setOpenDebito] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const [
        lancamentoSelecionado,
        setLancamentoSelecionado
    ] = useState(null);

    const { congregacaoSelecionada } = useCongregacao();

    const [paginaAtual, setPaginaAtual] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [totalRegistros, setTotalRegistros] = useState(0);

    const limite = 10;

    const [filtrosAtivos, setFiltrosAtivos] = useState({});


    async function buscarLancamentos(
        filtros = filtrosAtivos,
        pagina = paginaAtual
    ) {

        try {
            const filtrosBusca = {
                ...filtros,
                pagina,
                limite
            };

            if (congregacaoSelecionada !== null) {

                filtrosBusca.id_congregacao =
                    congregacaoSelecionada;
            }

            const resultado =
                await lancamentoService.listar(
                    filtrosBusca
                );

            setLancamentos(
                resultado.dados
            );

            setPaginaAtual(
                resultado.paginacao.pagina_atual
            );

            setTotalPaginas(
                resultado.paginacao.total_paginas
            );

            setTotalRegistros(
                resultado.paginacao.total_registros
            );

        } catch (erro) {
            console.error(erro);

            notificacoes.erro("Erro ao carregar os lançamentos");
        }
    }

    useEffect(() => {
        setPaginaAtual(1);

        buscarLancamentos(filtrosAtivos, 1);

    }, [congregacaoSelecionada]);


    function aplicarFiltros(filtros) {
        setFiltrosAtivos(filtros);
        setPaginaAtual(1);

        buscarLancamentos(
            filtros,
            1
        );
    }

    function limparFiltros() {
        setFiltrosAtivos({});
        setPaginaAtual(1);

        buscarLancamentos(
            {},
            1
        );
    }

    function paginaAnterior() {

        if (paginaAtual <= 1) {
            return;
        }

        const novaPagina = paginaAtual - 1;

        setPaginaAtual(novaPagina);

        buscarLancamentos(
            filtrosAtivos,
            novaPagina
        );

    }

    function proximaPagina() {

        if (paginaAtual >= totalPaginas) {
            return;
        }

        const novaPagina = paginaAtual + 1;

        setPaginaAtual(novaPagina);

        buscarLancamentos(
            filtrosAtivos,
            novaPagina
        );
    }

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

    function atualizarLancamentos() {
        buscarLancamentos(
            filtrosAtivos,
            paginaAtual
        );
    }

    return (

        <div className="pagina-lancamentos">

            <div className="cabecalho-lancamentos">

                <h1>Controlador de Caixa - Lançamentos</h1>

                <div className="acoes">
                    <button
                        onClick={novoCredito}
                        className="btn btn-success"
                    >
                        + Novo Crédito
                    </button>

                    <button
                        onClick={novoDebito}
                        className="btn btn-danger"
                    >
                        - Novo Débito
                    </button>
                </div>
            </div>

            <ResumoFinanceiro
                lancamentos={lancamentos}
            />

            <FiltroLancamentos
                onFiltrar={aplicarFiltros}
                onLimpar={limparFiltros}
            />

            <TabelaLancamentos
                lancamentos={lancamentos}

                onEditar={editarLancamento}
                onExcluir={confirmarExclusao}

                paginaAtual={paginaAtual}
                totalPaginas={totalPaginas}
                totalRegistros={totalRegistros}

                onPaginaAnterior={paginaAnterior}
                onProximaPagina={proximaPagina}
            />

            <Modal
                open={openCredito}
                onClose={fecharCredito}
                title={
                    lancamentoSelecionado
                        ? "Editar Crédito"
                        : "Novo Crédito"
                }
            >
                <CreditoForm
                    lancamento={
                        lancamentoSelecionado
                    }

                    onSuccess={() => {
                        atualizarLancamentos();
                        fecharCredito();
                    }}
                />
            </Modal>

            <Modal
                open={openDebito}
                onClose={fecharDebito}
                title={
                    lancamentoSelecionado
                        ? "Editar Débito"
                        : "Novo Débito"
                }
            >
                <DebitoForm
                    lancamento={
                        lancamentoSelecionado
                    }

                    onSuccess={() => {
                        atualizarLancamentos();
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
                    lancamento={
                        lancamentoSelecionado
                    }

                    onSuccess={() => {
                        atualizarLancamentos();
                        fecharDelete();
                    }}
                    onCancel={fecharDelete}
                />
            </Modal>
        </div>
    );
}

export default Lancamentos;