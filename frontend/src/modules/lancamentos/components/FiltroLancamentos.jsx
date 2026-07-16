import { useState } from "react";

import "./FiltroLancamentos.css";

function FiltroLancamentos({ onFiltrar, onLimpar }) {

    const estadoInicial = {
        tipo: "",
        categoria: "",
        descricao: "",
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

                <label>Pesquisar</label>

                <input
                    type="text"
                    name="descricao"
                    placeholder="Descrição do lançamento"
                    value={filtro.descricao}
                    onChange={handleChange}
                />

            </div>

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
                <select
                    name="categoria"
                    value={filtro.categoria}
                    onChange={handleChange}
                >
                    <option value="">Todas</option>
                    <optgroup label="Créditos">
                        <option value="Oferta">Oferta</option>
                        <option value="Dízimo">Dízimo</option>
                        <option value="Acerto">Acerto</option>
                        <option value="EBD">EBD</option>
                        <option value="CIBEM">CIBEM</option>
                        <option value="Anuidade">Anuidade</option>
                        <option value="oferta missionaria">Oferta Missionária</option>
                    </optgroup>

                    <optgroup label="Débitos">
                        <option value="concessionaria">Concessionária</option>
                        <option value="imposto">Imposto</option>
                        <option value="prebenda">Prebenda</option>
                        <option value="ajuda de custo">Ajuda de Custo</option>
                        <option value="despesa bancaria">Despesa Bancária</option>
                        <option value="oferta missionaria">Oferta Missionária</option>
                        <option value="CIBEM">CIBEM</option>
                        <option value="Anuidade">Anuidade</option>
                    </optgroup>
                </select>
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