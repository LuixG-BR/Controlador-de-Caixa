import { useState } from "react";
import api from "../../../api/api";


function CreditoForm() {


    const [dados, setDados] = useState({

        tipo: "credito",
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

            alert("Crédito lançado");

        } catch (error) {

            console.log(error.response?.data);

            alert("Erro ao lançar crédito");
        }
    }

    return (

        <form onSubmit={salvar}>

            <h2>Adicionar Crédito</h2>
                
            <select name="categoria" value={dados.categoria} onChange={alterar}>
                <option value="">Selecione</option>
                <option value="Oferta">Oferta</option>
                <option value="Dízimo">Dízimo</option>
                <option value="Acerto">Acerto</option>
                <option value="EBD">EBD</option>
                <option value="CIBEM">CIBEM</option>
                <option value="Anuidade"> Anuidade</option>
                <option value="oferta missionaria">Oferta missionária</option>                    
            </select>

            <input name="descricao" placeholder="Descrição" onChange={alterar} />

            <input type="number" name="valor" step="0.01" placeholder="Valor" onChange={alterar} />

            <input type="date" name="data" onChange={alterar} />

            <button>Salvar Crédito</button>
        </form>
    )
}

export default CreditoForm;