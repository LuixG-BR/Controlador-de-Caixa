function filtrarTabela() {
    const input = document.getElementById("filtro");
    const filtro = input.value.toLowerCase();
    const linhas = document.querySelectorAll("tbody tr");

    linhas.forEach((linha) => {
        const textoLinha = linha.textContent.toLowerCase();
        linha.style.display = textoLinha.includes(filtro) ? "" : "none";
    });
}

// RELATORIO EM PDF 
async function exportarPDF() {
    console.log('ola o JS está chegando')

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título do relatório
    const nomeArquivo = document.querySelector("input[name='nome']").value.trim();
    doc.text(nomeArquivo , 14, 14);

    // Cabeçalhos da tabela
    const headers = [];
    document.querySelectorAll("table thead th").forEach(th => {
        headers.push(th.innerText);
    });

    // Corpo da tabela
    const body = [];
    document.querySelectorAll("table tbody tr").forEach(tr => {
        const linha = [];
        tr.querySelectorAll("td").forEach(td => {
            linha.push(td.innerText.trim());
        });
        body.push(linha);
    });

    // Geração da tabela no PDF
    doc.autoTable({
        head: [headers],
        body: body,
        startY: 20,
        styles: {
            fontSize: 10,
            cellPadding: 3
        },
        headStyles: {
            fillColor: [30, 64, 175] // azul padrão
        }
    });

    // Nome fixo (pode evoluir depois)
    doc.save(nomeArquivo + ".pdf");
}
