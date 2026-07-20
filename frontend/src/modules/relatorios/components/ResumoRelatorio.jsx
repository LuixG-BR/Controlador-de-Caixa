function ResumoRelatorio({ resumo }) {

    if(!resumo){
        return null;
    }

    return (
        <div>
            <h2>Resumo</h2>
            <p>Total Créditos: {resumo.creditos}</p>
            <p>Total Débitos: {resumo.debitos}</p>
            <p>Saldo: {resumo.saldo}</p>
            <p>Lançamentos: {resumo.quantidade}</p>
        </div>
    );
}

export default ResumoRelatorio;