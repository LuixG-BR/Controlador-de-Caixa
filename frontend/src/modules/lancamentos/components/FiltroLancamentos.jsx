import { useState } from "react";

import "./FiltroLancamentos.css";

function FiltroLancamentos({ onFiltrar, onLimpar }) {

    const estadoInicial = {
        tipo: "",
        categoria: "",
        descricao: "",
        data_inicio: "",
        data_fim: "",
        ordenar: "data_desc"
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

            <div>
                <label>Ordenar por</label>
                <select
                    name="ordenar"
                    value={filtro.ordenar}
                    onChange={handleChange}
                >
                    <option value="data_desc">Mais recentes</option>
                    <option value="data_asc">Mais antigos</option>
                    <option value="valor_desc">Maior valor</option>
                    <option value="valor_asc">Menor valor</option>
                    <option value="categoria_asc">Categoria A-Z</option>
                    <option value="categoria_desc">Categoria Z-A</option>
                </select>
            </div>

            <div className="acoes-filtro">
                <button type="submit" className="btn btn-primary">
                    Filtrar
                </button>

                <button
                    type="button" onClick={limpar} className="btn btn-secondary"
                >
                    Limpar
                </button>
            </div>
        </form>
    );
}

export default FiltroLancamentos;