function CardAcoesRelatorio({ relatorio, exportarPDF }) {

    return (

        <div className="card-acoes-relatorio">

            <h2>Ações do Relatório</h2>

            <button
                onClick={exportarPDF}
                disabled={!relatorio}
                className="btn btn-danger"
            >
                📄 Exportar PDF
            </button>

            <button
                disabled
                className="btn btn-success"
            >
                📊 Exportar Excel
                <small> (Em breve)</small>
            </button>

            <button
                disabled
                className="btn btn-info"
            >
                🖨️ Imprimir
                <small> (Em breve)</small>
            </button>

        </div>
    );
}

export default CardAcoesRelatorio;