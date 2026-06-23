import { useState } from "react";
import api from "../api/api";


function DebitoForm() {


    const [dados, setDados] = useState({

        tipo: "debito",
        categoria: "",
        descricao: "",
        valor: "",
        data: ""

    });


    function alterar(e) {

        setDados({

            ...dados,

            [e.target.name]: e.target.value

        });
    }

    async function salvar(e) {

        e.preventDefault();

        try {

            await api.post("/lancamentos/", dados);

            alert("Débito lançado");


        } catch (error) {

            console.log(error.response?.data);

            alert("Erro ao lançar crédito");
        }
    }

    return (

        <form onSubmit={salvar}>

            <h2>Adicionar Débito</h2>

            <select name="categoria" value={dados.categoria} onChange={alterar}>
                <option value="">Selecione</option>
                <option value="concessionaria">Concessionaria</option>
                <option value="imposto">Imposto</option>
                <option value="prebenda">Prebenda</option>
                <option value="ajuda de custo">Ajuda de custo</option>
                <option value="oferta missionaria">Oferta missionaria</option>
                <option value="despesa bancaria">Despesa bancaria</option>
                <option value="CIBEM">CIBEM</option>
                <option value="Anuidade">Anuidade</option>
            </select>

            <input name="descricao" placeholder="Descrição" onChange={alterar} />

            <input type="number" name="valor" step="0.01" placeholder="Valor" onChange={alterar} />

            <input type="date" name="data" onChange={alterar} />

            <button>Salvar Débito</button>
        </form>
    )
}

export default DebitoForm;