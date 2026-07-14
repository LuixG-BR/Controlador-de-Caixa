import { useState } from "react";
import lancamentoService from "../services/lancamentoService";

function CreditoForm({ onSuccess }) {

    const [form, setForm] = useState({
        tipo: "credito",
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

            alert("Crédito cadastrado com sucesso!");

            setForm({
                tipo: "credito",
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
            alert("Erro ao cadastrar crédito.");
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
                <option value="Oferta">Oferta</option>
                <option value="Dízimo">Dízimo</option>
                <option value="Acerto">Acerto</option>
                <option value="EBD">EBD</option>
                <option value="CIBEM">CIBEM</option>
                <option value="Anuidade">Anuidade</option>
                <option value="Oferta Missionária">Oferta Missionária</option>

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
                Salvar Crédito
            </button>
        </form>
    );
}

export default CreditoForm;