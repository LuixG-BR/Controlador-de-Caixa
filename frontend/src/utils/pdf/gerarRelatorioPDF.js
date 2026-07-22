import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function gerarRelatorioPDF({
    usuario,
    filtros,
    resumo,
    lancamentos
}) {

    const doc = new jsPDF();

    // Cabeçalho
    doc.setFontSize(18);
    doc.text("CONTROLADOR DE CAIXA", 105, 15, { align: "center" });

    doc.setFontSize(13);
    doc.text("Relatório Financeiro", 105, 23, { align: "center" });

    doc.line(15, 28, 195, 28);

    // Informações
    doc.setFontSize(11);

    let y = 38;

    doc.text(`Congregação: ${usuario.congregacao}`, 15, y);

    y += 8;

    doc.text(
        `Período: ${filtros.data_inicio || "--"
        } até ${filtros.data_fim || "--"
        }`,
        15,
        y
    );

    y += 8;

    doc.text(
        `Tipo: ${filtros.tipo || "Todos"
        }`,
        15,
        y
    );

    y += 8;

    doc.text(
        `Categoria: ${filtros.categoria || "Todas"
        }`,
        15,
        y
    );

    y += 8;

    doc.text(
        `Descrição: ${filtros.descricao || "Todas"
        }`,
        15,
        y
    );

    // Usuário
    y += 12;

    doc.text(
        `Gerado por: ${usuario.nome}`,
        15,
        y
    );

    y += 8;

    doc.text(
        `Emitido em: ${new Date().toLocaleString("pt-BR")}`,
        15,
        y
    );

    // Resumo
    y += 15;

    doc.setFontSize(14);

    doc.text("Resumo Financeiro", 15, y);

    doc.setFontSize(11);

    y += 10;

    doc.text(
        `Créditos: R$ ${Number(resumo.creditos).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        15,
        y
    );

    y += 7;

    doc.text(
        `Débitos: R$ ${Number(resumo.debitos).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        15,
        y
    );

    y += 7;

    doc.text(
        `Saldo: R$ ${Number(resumo.saldo).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`,
        15,
        y
    );

    y += 7;

    doc.text(
        `Quantidade: ${resumo.quantidade}`,
        15,
        y
    );

    // Tabela
    autoTable(doc, {

        startY: y + 12,

        head: [[
            "Data",
            "Tipo",
            "Categoria",
            "Descrição",
            "Valor"
        ]],

        body: lancamentos.map(item => [

            new Date(item.data).toLocaleDateString("pt-BR"),

            item.tipo,

            item.categoria,

            item.descricao ?? "",

            Number(item.valor).toLocaleString(
                "pt-BR",
                {
                    minimumFractionDigits: 2
                }
            )

        ])

    });

    // Rodapé
    const paginas = doc.getNumberOfPages();

    for (let i = 1; i <= paginas; i++) {

        doc.setPage(i);

        doc.setFontSize(9);

        doc.text(
            `Controlador de Caixa - Página ${i}/${paginas}`,
            105,
            290,
            { align: "center" }
        );

    }

    doc.save("RelatorioFinanceiro.pdf");

}