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

    let y = 50;

    // RESUMO
    y += 10;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(
        "RESUMO",
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
    y = doc.lastAutoTable.finalY + 10;

    // DADOS DA EMISSÃO
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);

    doc.text("Dados do Relatório", 13, y);

    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    // Linha única
    doc.text(`Emitido por: ${usuario?.nome || "-"}`, 15, y);

    doc.text(`Congregação: ${usuario?.congregacao || "-"}`, 85, y);

    doc.text(`Data: ${dataGeracao} ${horaGeracao}`, 130, y);

    y += 8;

    // FILTROS UTILIZADOS
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);

    doc.text("Filtros Utilizados", 13, y);

    y += 6;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);

    doc.text(
        `Tipo: ${filtros.tipo || "Todos"}    |    Categoria: ${filtros.categoria || "Todas"}`,
        15, y
    );

    doc.text(
        `Descrição: ${filtros.descricao || "Todas"}`,
        85, y
    );

    doc.text(
        `Período: ${filtros.data_inicio
            ? formatarData(filtros.data_inicio)
            : "Início"
        } até ${filtros.data_fim
            ? formatarData(filtros.data_fim)
            : "Hoje"
        }`, 130, y
    );

    y += 15;

    y = doc.lastAutoTable.finalY + 35;

    // TABELA
    autoTable(doc, {
        startY: y,
        theme: "grid",

        styles: {
            font: "helvetica",
            fontSize: 9,
            cellPadding: 3,
            lineColor: [220, 220, 220],
            lineWidth: 0.1,
            valign: "middle"
        },

        headStyles: {
            fillColor: [30, 41, 59],
            textColor: [255, 255, 255],
            fontStyle: "bold",
            halign: "center"
        },

        alternateRowStyles: {
            fillColor: [248, 249, 250]
        },

        bodyStyles: {
            textColor: [40, 40, 40]
        },

        columnStyles: {
            0: {
                cellWidth: 24,
                halign: "center"
            },
            1: {
                cellWidth: 24,
                halign: "center"
            },
            2: {
                cellWidth: 38
            },
            3: {
                cellWidth: 72
            },
            4: {
                cellWidth: 32,
                halign: "right"
            }
        },

        head: [[
            "Data",
            "Tipo",
            "Categoria",
            "Descrição",
            "Valor"
        ]],

        body: relatorio.lancamentos.map(l => [
            formatarData(l.data),
            l.tipo === "credito"
                ? "Crédito"
                : "Débito",

            l.categoria,
            l.descricao,
            formatarMoeda(l.valor)
        ])
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