<?php
include_once "conexao.php";

$sql = "SELECT * FROM lancamentos";
$resultado = mysqli_query($conexao, $sql);

$sqlCalculo = "
    SELECT 
        SUM(CASE WHEN tipo = 'credito' THEN valor ELSE 0 END) AS total_credito,
        SUM(CASE WHEN tipo = 'debito' THEN valor ELSE 0 END) AS total_debito
    FROM lancamentos
";

$resultadoCalculo = mysqli_query($conexao, $sqlCalculo);
$totais = mysqli_fetch_assoc($resultadoCalculo);

$totalCredito = $totais['total_credito'] ?? 0;
$totalDebito  = $totais['total_debito'] ?? 0;

$saldo = $totalCredito - $totalDebito;

?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css" type="text/css">
    <link rel="stylesheet" href="../css/sidebar.css" type="text/css">
    <script src="../js/script.js"></script>
    <title>Controlador de Caixa</title>
</head>

<body>
    <script>
        function filtrarTipo(tipo) {
            const linhas = document.querySelectorAll("tbody tr");
            const botoes = document.querySelectorAll(".filtros-tipo button");

            // ativa botão clicado
            botoes.forEach(btn => btn.classList.remove("ativo"));
            event.target.classList.add("ativo");

            linhas.forEach(linha => {
                const tipoLinha = linha.dataset.tipo;

                if (tipo === "todos") {
                    linha.style.display = "";
                } else {
                    linha.style.display = tipoLinha === tipo ? "" : "none";
                }
            });
        }
    </script>
    <div class="sidebar">
        <h2>Movimentos</h2>

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
                <a href="editar_lancamento.php">✏️ Atualizar Lançamento</a>
            </li>
            <hr>
            <li>
                <a href="relatorios.php"> Relatorios</a>
            </li>
        </ul>
    </div>
    <main class="main">
        <div class="container" style="width: 1100px;">
            <h1>Movimentos</h1>

            <div class="resumo-financeiro">
                <div class="box credito">
                    <span>Crédito</span>
                    <strong><?= $totalCredito ?></strong>
                </div>

                <div class="box debito">
                    <span>Débito</span>
                    <strong><?= $totalDebito ?></strong>
                </div>

                <div class="box saldo">
                    <span>Saldo</span>
                    <strong><?= $saldo ?></strong>
                </div>
            </div>

            <input type="text" id="filtro" placeholder="Filtrar por nome, Categoria ou Data..." onkeyup="filtrarTabela()">
            <div class="filtros-tipo">
                <button onclick="filtrarTipo('todos')" class="ativo">Todos</button>
                <button onclick="filtrarTipo('credito')">Crédito</button>
                <button onclick="filtrarTipo('debito')">Débito</button>
            </div>


            <table id="tabela-movimentos" class="tabela">
                <thead>
                    <tr>
                        <!-- <th>ID</th> -->
                        <th>Tipo</th>
                        <th>Data</th>
                        <th>Categoria</th>
                        <th>Congregação</th>
                        <th>Nome</th>
                        <th>Valor</th>
                    </tr>
                </thead>

                <tbody>
                    <?php while ($lancamento = mysqli_fetch_assoc($resultado)) : ?>
                        <tr data-tipo="<?= $lancamento['tipo']; ?>" class="<?= $lancamento['tipo']; ?>">
                            <!-- <td><?= $lancamento['id'] ?></td> -->
                            <td><?= $lancamento['tipo'] ?></td>
                            <td><?= date('d/m/Y', strtotime($lancamento['data'])); ?></td>
                            <td><?= $lancamento['categoria']; ?></td>
                            <td><?= $lancamento['congregacao']; ?></td>
                            <td><?= $lancamento['nome']; ?></td>
                            <td>R$ <?= number_format($lancamento['valor'], 2, ',', '.'); ?></td>
                        </tr>
                    <?php endwhile; ?>
                </tbody>
            </table>
        </div>
        </div>
    </main>
</body>

</html>