function ResumoRelatorio({ resumo }) {

    if (!resumo) return null;

    return (

        <div className="cards-grid">
            <div className="card credito">
                <div className="card-header">
                    <h3 className="card-title">
                        Créditos
                    </h3>
                </div>

                <div className="card-content">
                    <strong>
                        R$ {Number(resumo.resumo.creditos).toLocaleString(
                            "pt-BR",
                            {
                                minimumFractionDigits: 2
                            }
                        )}
                    </strong>
                </div>
            </div>

            <div className="card debito">
                <div className="card-header">
                    <h3 className="card-title">
                        Débitos
                    </h3>
                </div>

                <div className="card-content">
                    <strong>
                        R$ {Number(resumo.resumo.debitos).toLocaleString(
                            "pt-BR",
                            {
                                minimumFractionDigits: 2
                            }
                        )}
                    </strong>
                </div>
            </div>

            <div className="card saldo">
                <div className="card-header">
                    <h3 className="card-title">
                        Saldo
                    </h3>
                </div>

                <div className="card-content">
                    <strong>
                        R$ {Number(resumo.resumo.saldo).toLocaleString(
                            "pt-BR",
                            {
                                minimumFractionDigits: 2
                            }
                        )}
                    </strong>
                </div>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">
                        Lançamentos
                    </h3>
                </div>

                <div className="card-content">
                    <strong>
                        {resumo.resumo.quantidade}
                    </strong>
                </div>
            </div>
        </div>
    );
}

export default ResumoRelatorio;