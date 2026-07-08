import { useEffect, useState } from "react";
import api from "../../../api/api";


function TabelaLancamentos() {

    const [lancamentos, setLancamentos] = useState([]);


    async function buscarLancamentos() {

        try {

            const resposta = await api.get("/lancamentos/");
            setLancamentos(resposta.data);

        } catch (error) {
            console.log(
                error.response?.data
            );
        }
    }

    useEffect(() => {
        buscarLancamentos();
    }, []);


    return (
        <div>
            <h2>Lançamentos</h2>

            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Descrição</th>
                        <th>Valor</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        lancamentos.map(
                            (item) => (

                                <tr key={item.id_lancamento}>
                                    <td>{item.data}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.categoria}</td>
                                    <td>{item.descricao}</td>
                                    <td>R$ {item.valor}</td>
                                </tr>
                            ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TabelaLancamentos;