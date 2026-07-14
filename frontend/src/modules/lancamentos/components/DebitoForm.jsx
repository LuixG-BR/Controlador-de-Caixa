import { useState } from "react";
import lancamentoService from "../services/lancamentoService";

function DebitoForm({ onSuccess }) {

    const [form, setForm] = useState({
        tipo: "debito",
        categoria: "",
        descricao: "",
        valor: "",
        data: ""
    });

    function handleChange(e) {

        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            await lancamentoService.criar(form);

            alert("Débito cadastrado com sucesso!");

            setForm({
                tipo: "debito",
                categoria: "",
                descricao: "",
                valor: "",
                data: ""
            });

            if (onSuccess) {
                onSuccess();
            }
        } catch (erro) {
            console.error(erro);
            alert("Erro ao cadastrar débito.");
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

            <button type="submit">
                Salvar Débito
            </button>
        </form>
    );
}

export default DebitoForm;