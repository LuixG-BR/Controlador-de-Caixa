import { useState } from "react";

import "./FiltroLancamentos.css";

function FiltroLancamentos({ onFiltrar, onLimpar }) {

    const estadoInicial = {
        tipo: "",
        categoria: "",
        data_inicio: "",
        data_fim: ""
    };

    const [filtro, setFiltro] = useState(estadoInicial);

    function handleChange(e) {
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onFiltrar(filtro);
    }

    function limpar() {
        setFiltro(estadoInicial);
        onLimpar();
    }

    return (

        <form
            className="filtro-lancamentos"
            onSubmit={handleSubmit}
        >
            <div>
                <label>Tipo</label>
                <select
                    name="tipo"
                    value={filtro.tipo}
                    onChange={handleChange}
                >
                    <option value="">Todos</option>
                    <option value="credito">Crédito</option>
                    <option value="debito">Débito</option>
                </select>
            </div>

            <div>
                <label>Categoria</label>
                <input
                    type="text"
                    name="categoria"
                    placeholder="Categoria"
                    value={filtro.categoria}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Data Inicial</label>
                <input
                    type="date"
                    name="data_inicio"
                    value={filtro.data_inicio}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label>Data Final</label>
                <input
                    type="date"
                    name="data_fim"
                    value={filtro.data_fim}
                    onChange={handleChange}
                />
            </div>

            <div className="acoes-filtro">
                <button type="submit">
                    Filtrar
                </button>

                <button
                    type="button"
                    onClick={limpar}
                >
                    Limpar
                </button>
            </div>
        </form>
    );
}

export default FiltroLancamentos;