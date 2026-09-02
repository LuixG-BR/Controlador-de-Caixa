import "./ResumoFinanceiro.css";

function ResumoFinanceiro({ lancamentos = [] }) {

    const resumo = lancamentos.reduce(

        (acc, item) => {
            const valor = Number(item.valor);

            if (item.tipo === "credito") {
                acc.entradas += valor;
            } else {
                acc.saidas += valor;
            }
            acc.saldo = acc.entradas - acc.saidas;
            return acc;
        },
        {
            entradas: 0,
            saidas: 0,
            saldo: 0
        }
    );

    function formatar(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    return (
        <div className="resumo-financeiro">

            <div className="card-resumo border-credito">
                <h3>Entradas</h3>
                <p>{formatar(resumo.entradas)}</p>
            </div>

            <div className="card-resumo border-debito">
                <h3>Saídas</h3>
                <p>{formatar(resumo.saidas)}</p>
            </div>

            <div className="card-resumo border-saldo">
                <h3>Saldo</h3>
                <p>{formatar(resumo.saldo)}</p>
            </div>
        </div>
    );
}

export default ResumoFinanceiro;