function CardAcoesRelatorio({ relatorio, exportarPDF }) {

    return (

        <div className="card">

            <div className="card-header">
                <h3 className="card-title">
                    Ações do relatório
                </h3>
            </div>

            <div className="card-footer">
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
        </div>
    );
}

export default CardAcoesRelatorio;