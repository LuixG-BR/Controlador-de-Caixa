import { useState } from "react";

function FiltroRelatorio({ setResumo }) {

    const [filtro, setFiltro] = useState({
        data_inicio: "",
        data_fim: "",
        tipo: "",
        categoria: ""
    });

    function handleChange(e){
        setFiltro({
            ...filtro,
            [e.target.name]: e.target.value
        });
    }

    function gerarResumo(e){
        e.preventDefault();
        console.log(filtro);
    }

    return (
        <form onSubmit={gerarResumo}>

            <h2>Filtros</h2>

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
                    value={filtro.categoria}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">Gerar Relatorio</button>
        </form>
    );
}

export default FiltroRelatorio;