import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function gerarRelatorioPDF(
    relatorio,
    usuario,
    filtros = {}
) {

    const doc = new jsPDF();

    // FORMATAÇÕES
    const formatarMoeda = (valor) =>
        Number(valor || 0).toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );

    const formatarData = (data) =>
        new Date(data).toLocaleDateString("pt-BR");

    const agora = new Date();

    const dataGeracao = agora.toLocaleDateString("pt-BR");

    const horaGeracao = agora.toLocaleTimeString("pt-BR");

    // CABEÇALHO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);

    doc.text(
        "CONTROLADOR DE CAIXA",
        105,
        18,
        { align: "center" }
    );

    doc.setFontSize(12);

    doc.text(
        "Relatório Financeiro",
        105,
        26,
        { align: "center" }
    );

    doc.line(15, 32, 195, 32);

    // DADOS DO RELATÓRIO
    let y = 42;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    doc.text("Congregação:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(
        usuario?.congregacao || "-",
        55,
        y
    );

    y += 7;

    doc.setFont("helvetica", "bold");
    doc.text("Gerado por:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(
        usuario?.nome || "-",
        55,
        y
    );

    y += 7;

    doc.setFont("helvetica", "bold");
    doc.text("Data:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(dataGeracao, 55, y);

    y += 7;

    doc.setFont("helvetica", "bold");
    doc.text("Hora:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(horaGeracao, 55, y);

    // FILTROS
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.text("Filtros Utilizados", 15, y);

    y += 7;

    doc.setFontSize(10);

    doc.setFont("helvetica", "bold");
    doc.text("Tipo:", 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(
        filtros.tipo || "Todos",
        55,
        y
    );

    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Categoria:", 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(
        filtros.categoria || "Todas",
        55,
        y
    );

    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Descrição:", 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(
        filtros.descricao || "Todas",
        55,
        y
    );

    y += 6;

    doc.setFont("helvetica", "bold");
    doc.text("Período:", 15, y);

    doc.setFont("helvetica", "normal");

    const periodo =
        filtros.data_inicio && filtros.data_fim
            ? `${formatarData(filtros.data_inicio)} até ${formatarData(filtros.data_fim)}`
            : "Todo o período";

    doc.text(periodo, 55, y);

    // RESUMO
    y += 14;

    doc.setFontSize(12);

    doc.setFont("helvetica", "bold");

    doc.text(
        "Resumo Financeiro",
        15,
        y
    );

    y += 8;

    doc.setFontSize(10);

    doc.setFont("helvetica", "bold");

    doc.text("Entradas:", 15, y);

    doc.setFont("helvetica", "normal");

    doc.text(
        formatarMoeda(relatorio.resumo.creditos),
        55,
        y
    );

    y += 6;

    doc.setFont("helvetica", "bold");

    doc.text("Saídas:", 15, y);

    doc.setFont("helvetica", "normal");

    doc.text(
        formatarMoeda(relatorio.resumo.debitos),
        55,
        y
    );

    y += 6;

    doc.setFont("helvetica", "bold");

    doc.text("Saldo:", 15, y);

    doc.setFont("helvetica", "normal");

    doc.text(
        formatarMoeda(relatorio.resumo.saldo),
        55,
        y
    );

    // TABELA
    autoTable(doc, {

        startY: y + 12,

        head: [[
            "Data",
            "Tipo",
            "Categoria",
            "Descrição",
            "Valor"
        ]],

        body: relatorio.lancamentos.map(item => [
            formatarData(item.data),
            item.tipo,
            item.categoria,
            item.descricao,
            formatarMoeda(item.valor)
        ]),

        styles: {
            fontSize: 9
        },

        headStyles: {
            fillColor: [41, 128, 185]
        }

    });

    // RODAPÉ
    const paginas = doc.internal.getNumberOfPages();

    for (let i = 1; i <= paginas; i++) {

        doc.setPage(i);

        doc.setFontSize(9);

        doc.text(
            "Documento gerado automaticamente pelo Controlador de Caixa",
            105,
            287,
            {
                align: "center"
            }
        );

        doc.text(
            `Página ${i} de ${paginas}`,
            195,
            293,
            {
                align: "right"
            }
        );

    }

    // NOME DO ARQUIVO
    const dataArquivo = agora.toISOString().slice(0, 10);
    doc.save(`Relatorio_${dataArquivo}.pdf`);
}