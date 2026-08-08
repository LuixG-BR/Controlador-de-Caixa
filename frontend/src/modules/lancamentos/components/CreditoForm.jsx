import { useEffect, useState } from "react";
import lancamentoService from "../services/lancamentoService";
import notificacoes from "../../../utils/toast";

import { useCongregacao } from "../../../context/CongregacaoContext";

function CreditoForm({ lancamento, onSuccess }) {

    const { congregacaoSelecionada } = useCongregacao();

    const estadoInicial = {
        tipo: "credito",
        categoria: "",
        descricao: "",
        valor: "",
        data: ""
    };

    const [form, setForm] = useState(estadoInicial);

    useEffect(() => {

        if (lancamento) {

            setForm({
                tipo: lancamento.tipo,
                categoria: lancamento.categoria,
                descricao: lancamento.descricao ?? "",
                valor: lancamento.valor,
                data: lancamento.data
            });

        } else {

            setForm(estadoInicial);

        }

    }, [lancamento]);

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {
            if (lancamento) {

                await lancamentoService.editar(
                    lancamento.id_lancamento,
                    form
                );

            } else {

                const dados = {
                    ...form
                };

                if (
                    congregacaoSelecionada !== null
                ) {
                    dados.id_congregacao = congregacaoSelecionada;
                }

                await lancamentoService.criar(dados);

                notificacoes.sucesso("Crédito cadastrado com sucesso!");

                setForm(estadoInicial);

                if (onSuccess) {
                    onSuccess();
                }
            }

        } catch (erro) {
            console.error(erro);
            notificacoes.erro("Erro ao cadastrar crédito.");
        }

    }

    return (

        <form onSubmit={handleSubmit} className="formulario">

            <div className="form-row">

                <div className="form-group">
                    <label>Categoria</label>
                    <select
                        name="categoria"
                        value={form.categoria}
                        onChange={handleChange}
                    >
                        <option value="">Categoria</option>
                        <option value="Oferta">Oferta</option>
                        <option value="Dízimo">Dízimo</option>
                        <option value="Acerto">Acerto</option>
                        <option value="EBD">EBD</option>
                        <option value="CIBEM">CIBEM</option>
                        <option value="Anuidade">Anuidade</option>
                        <option value="Oferta Missionária">Oferta Missionária</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Descrição</label>
                    <input
                        type="text"
                        name="descricao"
                        value={form.descricao}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Valor</label>
                    <input
                        type="number"
                        step="0.01"
                        name="valor"
                        value={form.valor}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <label>Data</label>
                    <input
                        type="date"
                        name="data"
                        value={form.data}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="form-acoes">
                <button type="submit" className="btn btn-success">
                    {lancamento ? "Salvar Alterações" : "Salvar Crédito"}
                </button>
            </div>

        </form>
    );
}

export default CreditoForm;