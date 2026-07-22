function CardAcoesRelatorio({ relatorio, exportarPDF }) {

    return (

        <div className="card-acoes-relatorio">

            <h2>Ações do Relatório</h2>

            <button
                onClick={exportarPDF}
                disabled={!relatorio}
            >
                📄 Exportar PDF
            </button>

            <button disabled>
                📊 Exportar Excel
                <small> (Em breve)</small>
            </button>

            <button disabled>
                🖨️ Imprimir
                <small> (Em breve)</small>
            </button>

        </div>
    );
}

export default CardAcoesRelatorio;