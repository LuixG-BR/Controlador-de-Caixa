import { useEffect, useState } from "react";

import SeletorCongregacao from "../components/SeletorCongregacao";
import dashboardService from "../services/dashboardService";
import { useCongregacao } from "../../../context/CongregacaoContext";

function Dashboard() {
    const { congregacaoSelecionada, setCongregacaoSelecionada } = useCongregacao();

    const [lancamentos, setLancamentos] = useState([]);
    const [carregando, setCarregando] = useState(false);

    useEffect(() => {

        async function carregarDados() {
            try {
                setCarregando(true);

                const dados = await dashboardService.listarLancamentos(
                    congregacaoSelecionada
                );
                setLancamentos(dados);

            } catch (erro) {
                console.error(
                    "Erro ao carregar dados do Dashboard:",
                    erro
                );
            } finally {
                setCarregando(false);
            }
        }
        carregarDados();
    }, [congregacaoSelecionada]);

    const creditos = lancamentos
        .filter(
            (lancamento) =>
                lancamento.tipo === "credito"
        )
        .reduce(
            (total, lancamento) =>
                total + Number(lancamento.valor || 0),
            0
        );

    const debitos = lancamentos
        .filter(
            (lancamento) =>
                lancamento.tipo === "debito"
        )
        .reduce(
            (total, lancamento) =>
                total + Number(lancamento.valor || 0),
            0
        );

    const saldo = creditos - debitos;

    function formatarMoeda(valor) {

        return Number(valor).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    return (

        <div>

            <h1>Dashboard</h1>

            <h2>Bem-vindo</h2>

            <SeletorCongregacao
                valor={congregacaoSelecionada}
                onChange={setCongregacaoSelecionada}
            />

            {carregando ? (
                <p>
                    Carregando dados...
                </p>
            ) : (
                <div>
                    <div>
                        <h3>Créditos</h3>
                        <p>
                            {formatarMoeda(creditos)}
                        </p>
                    </div>

                    <div>
                        <h3>Débitos</h3>
                        <p>
                            {formatarMoeda(debitos)}
                        </p>
                    </div>

                    <div>
                        <h3>Saldo</h3>
                        <p>
                            {formatarMoeda(saldo)}
                        </p>
                    </div>

                    <div>
                        <h3>Lançamentos</h3>
                        <p>
                            {lancamentos.length}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;