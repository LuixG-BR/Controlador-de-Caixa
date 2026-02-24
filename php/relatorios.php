<?php
include_once "conexao.php";

$dataInicio  = $_GET['data_inicio'] ?? null;
$dataFim     = $_GET['data_fim'] ?? null;
$congregacao = $_GET['congregacao'] ?? 'todas';
$categoria = $_GET['categoria'] ?? 'todas';

$totalCredito = 0;
$totalDebito  = 0;
$saldo        = 0;
$resultado    = null;

$where = "WHERE data BETWEEN '$dataInicio' AND '$dataFim'";

if ($congregacao !== 'todas') {
    $where .= " AND congregacao = '$congregacao'";
}

if ($categoria !== 'todas') {
    $where .= " AND categoria = '$categoria'";
}


$sqlTotais = "
    SELECT
        SUM(CASE WHEN tipo = 'credito' THEN valor ELSE 0 END) AS total_credito,
        SUM(CASE WHEN tipo = 'debito' THEN valor ELSE 0 END) AS total_debito
    FROM lancamentos
    $where
";

$resTotais = mysqli_query($conexao, $sqlTotais);
$totais = mysqli_fetch_assoc($resTotais);

$totalCredito = $totais['total_credito'] ?? 0;
$totalDebito  = $totais['total_debito'] ?? 0;
$saldo        = $totalCredito - $totalDebito;


$sqlTabela = "
    SELECT *
    FROM lancamentos
    $where
    ORDER BY data ASC
";

$resultado = mysqli_query($conexao, $sqlTabela);
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <title>Relatórios - Controle de Caixa</title>
    <link rel="stylesheet" href="../css/sidebar.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/relatorios.css">
    <script src="../js/script.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
</head>

<body>
    <div class="sidebar">
        <h2>Controle de Caixa</h2>
        <ul>
            <li>
                <a href="../principal.html">🏠 Home</a>
            </li>
            <hr>
            <li>
                <a href="add_credito.php">➕ Cadastrar Crédito</a>
            </li>
            <li>
                <a href="add_debito.php">➖ Cadastrar Débito</a>
            </li>
            <li>
                <a href="editar.php">✏️ Atualizar Lançamento</a>
            </li>
            <hr>
            <li>
                <a href="movimentos.php"> Movimentos</a>
            </li>
        </ul>
    </div>

    <!-- CONTEÚDO PRINCIPAL -->
    <main class="conteudo">

        <h1>Relatório Financeiro</h1>

        <!-- FILTROS -->
        <section>
            <form method="GET" class="filtros-relatorio">

                <div class="filtro">
                    <label>Data inicial</label>
                    <input type="date" name="data_inicio" required>
                </div>

                <div class="filtro">
                    <label>Data final</label>
                    <input type="date" name="data_fim" required>
                </div>

                <div class="filtro">
                    <label>Congregação</label>
                    <select name="congregacao">
                        <option value="todas">Todas</option>
                        <option value="Sede">Sede</option>
                        <option value="Jacupiranga">Jacupiranga</option>
                        <option value="Pariquera">Pariquera</option>
                        <option value="Iguape">Iguape</option>
                        <option value="Ilha Comprida">Ilha Comprida</option>
                        <option value="Itimirim">Itimirim</option>
                        <option value="Sete Barras">Sete Barras</option>
                        <option value="Cananeia">Cananéia</option>
                        <option value="Angatuba">Angatuba</option>
                        <option value="Serrote">Serrote</option>
                        <option value="Guaviruva">Guaviruva</option>
                        <option value="Barra do Ribeirão">Barra do Ribeirão</option>
                        <option value="Jardim Alvorada">Jardim Alvorada</option>
                        <option value="Itapitangui">Itapitangui</option>
                    </select>
                </div>

                <div class="filtro">
                    <label>Categoria(Acerto...)</label>
                    <select name="categoria">
                        <option value="todas">Todas</option>
                        <option value="acerto">acerto</option>
                        <option value="EBD">EBD</option>
                        <option value="oferta">oferta</option>
                        <option value="dizimo">dizimo</option>
                        <option value="concessionaria">concessionaria</option>
                        <option value="imposto">imposto</option>
                        <option value="prebenda">prebenda</option>
                        <option value="ajuda de custo">ajuda de custo</option>
                        <option value="oferta missionaria">oferta missionaria</option>
                        <option value="despesa bancaria">despesa bancaria</option>
                        <option value="CIBEM">CIBEM</option>
                        <option value="Anuidade">Anuidade</option>
                    </select>
                </div>

                <button type="submit" class="btn-gerar">Gerar Relatório</button>
            </form>

        </section>

        <!-- RESUMO -->
        <section class="resumo-relatorio">
            <div class="resumo credito">
                <span>Créditos</span>
                <strong>R$ <?= number_format($totalCredito, 2, ',', '.') ?></strong>
            </div>

            <div class="resumo debito">
                <span>Débitos</span>
                <strong>R$ <?= number_format($totalDebito, 2, ',', '.') ?></strong>
            </div>

            <div class="resumo saldo">
                <span>Saldo</span>
                <strong>R$ <?= number_format($saldo, 2, ',', '.') ?></strong>
            </div>
        </section>

        <!-- TABELA -->
        <section class="tabela-relatorio">
            <table>
                <thead>
                    <tr>
                        <th>Data</th>
                        <th>Tipo</th>
                        <th>Categoria</th>
                        <th>Congregação</th>
                        <th>Nome</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if ($resultado): ?>
                        <?php while ($lanc = mysqli_fetch_assoc($resultado)): ?>
                            <tr class="<?= $lanc['tipo']; ?>">
                                <td><?= date('d/m/Y', strtotime($lanc['data'])) ?></td>
                                <td><?= ucfirst($lanc['tipo']) ?></td>
                                <td><?= $lanc['categoria'] ?></td>
                                <td><?= $lanc['congregacao'] ?></td>
                                <td><?= $lanc['nome'] ?></td>
                                <td>R$ <?= number_format($lanc['valor'], 2, ',', '.') ?></td>
                            </tr>
                        <?php endwhile; ?>
                    <?php endif; ?>
                </tbody>

            </table>
        </section>

        <!-- AÇÕES -->
        <section class="acoes-relatorio">
            <input type="text" name="nome" placeholder="Digite o Nome do Arquivo...">
            <button class="btn-pdf" id="exportarPDF" onclick="exportarPDF()">📄 Gerar PDF</button>
        </section>

    </main>

</body>

</html>