function ResumoRelatorio({ resumo }) {

    if (!resumo) {
        return null;
    }

    return (
        <div>
            <h2>Resumo</h2>

            <p>Créditos: R$ {resumo.resumo.creditos}</p>
            <p>Débitos: R$ {resumo.resumo.debitos}</p>
            <p>Saldo: R$ {resumo.resumo.saldo}</p>
            <p>Quantidade: {resumo.resumo.quantidade}</p>
        </div>
    );
}

export default ResumoRelatorio;