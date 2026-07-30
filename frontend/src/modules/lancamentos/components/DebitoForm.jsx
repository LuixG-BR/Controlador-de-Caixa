import { useEffect, useState } from "react";
import lancamentoService from "../services/lancamentoService";
import notificacoes from "../../../utils/toast";

function DebitoForm({ lancamento, onSuccess }) {

    const estadoInicial = {
        tipo: "debito",
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

                await lancamentoService.criar(form);

                notificacoes.sucesso("Débito cadastrado com sucesso!");

                setForm(estadoInicial);

                if (onSuccess) {
                    onSuccess();
                }
            }
        } catch (erro) {
            console.error(erro);
            notificacoes.erro("Erro ao cadastrar débito.");
        }
    }

    return (

        <form onSubmit={handleSubmit}>

            <label>Categoria</label>
            <select
                name="categoria"
                value={form.categoria}
                onChange={handleChange}
            >
                <option value="">Categoria</option>
                <option value="concessionaria">Concessionária</option>
                <option value="imposto">Imposto</option>
                <option value="prebenda">Prebenda</option>
                <option value="ajuda de custo">Ajuda de custo</option>
                <option value="oferta missionaria">Oferta Missionária</option>
                <option value="despesa bancaria">Despesa bancária</option>
                <option value="CIBEM">CIBEM</option>
                <option value="Anuidade">Anuidade</option>
            </select>

            <label>Descrição</label>
            <input
                type="text"
                name="descricao"
                value={form.descricao}
                onChange={handleChange}
            />

            <label>Valor</label>
            <input
                type="number"
                step="0.01"
                name="valor"
                value={form.valor}
                onChange={handleChange}
            />

            <label>Data</label>
            <input
                type="date"
                name="data"
                value={form.data}
                onChange={handleChange}
            />

            <button type="submit" className="btn btn-success">
                {lancamento ? "Salvar Alterações" : "Salvar Débito"}
            </button>
        </form>
    );
}

export default DebitoForm;