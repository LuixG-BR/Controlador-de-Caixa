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
    const titulo = "CONTROLADOR DE CAIXA";
    const subtitulo = "Sistema de Gestão Financeira";
    const documento = "Relatório Financeiro";

    doc.setDrawColor(30, 41, 59);
    doc.setLineWidth(0.8);
    doc.line(15, 15, 195, 15);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    doc.text(
        titulo,
        105,
        24,
        { align: "center" }
    );

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);

    doc.text(
        subtitulo,
        105,
        31,
        { align: "center" }
    );

    doc.setDrawColor(180);
    doc.setLineWidth(0.3);
    doc.line(15, 36, 195, 36);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(15);

    doc.text(
        documento,
        105,
        45,
        { align: "center" }
    );

    doc.setDrawColor(220);
    doc.line(15, 50, 195, 50);

    // DADOS DO RELATÓRIO
    let y = 60;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");

    doc.text("Congregação:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(
        usuario?.congregacao || "-",
        45,
        y
    );

    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Gerado por:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(
        usuario?.nome || "-",
        45,
        y
    );

    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Emitido em:", 15, y);
    doc.setFont("helvetica", "normal");
    doc.text(dataGeracao + " às " + horaGeracao, 45, y);

    // FILTROS
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);

    doc.text("Filtros Utilizados", 15, y);

    y += 8;

    doc.setFontSize(10);

    doc.setFont("helvetica", "bold");
    doc.text("Tipo:", 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(
        filtros.tipo || "Todos",
        45,
        y
    );

    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Categoria:", 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(
        filtros.categoria || "Todas",
        45,
        y
    );

    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Descrição:", 15, y);

    doc.setFont("helvetica", "normal");
    doc.text(
        filtros.descricao || "Todas",
        45,
        y
    );

    y += 8;

    doc.setFont("helvetica", "bold");
    doc.text("Período:", 15, y);

    doc.setFont("helvetica", "normal");

    const periodo =
        filtros.data_inicio && filtros.data_fim
            ? `${formatarData(filtros.data_inicio)} até ${formatarData(filtros.data_fim)}`
            : "Todo o período";

    doc.text(periodo, 45, y);

    // RESUMO
    y += 12;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(
        "RESUMO FINANCEIRO",
        105,
        y,
        { align: "center" }
    );

    autoTable(doc, {
        startY: y + 6,
        theme: "grid",
        styles: {
            fontSize: 10,
            cellPadding: 3,
            halign: "left"
        },
        columnStyles: {
            0: {
                halign: "left",
                fontStyle: "bold",
                cellWidth: 90
            },
            1: {
                halign: "right",
                cellWidth: 70
            }
        },

        head: [[
            "Descrição",
            "Valor"
        ]],

        body: [
            [
                "Entradas",
                formatarMoeda(relatorio.resumo.creditos)
            ],
            [
                "Saídas",
                formatarMoeda(relatorio.resumo.debitos)
            ],
            [
                "Saldo Atual",
                formatarMoeda(relatorio.resumo.saldo)
            ],
            [
                "Quantidade de Lançamentos",
                relatorio.resumo.quantidade.toString()
            ]
        ],

        headStyles: {
            fillColor: [30, 41, 59],
            textColor: 255,
            fontStyle: "bold"
        }
    });

    // Atualiza o eixo Y para iniciar a próxima tabela logo abaixo
    y = doc.lastAutoTable.finalY + 12;

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

    const dataArquivo = agora.toISOString().slice(0, 10);
    doc.save(`Relatorio_${dataArquivo}.pdf`);
}