<?php
include_once "conexao.php";

$id = intval($_GET['id'] ?? 0);
$sql = "SELECT * FROM lancamentos WHERE id = $id";
$res = mysqli_query($conexao, $sql);
$lancamento =  mysqli_fetch_assoc($res);
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/descricao.css">
    <title>Descrição Lançamento</title>
</head>

<body>
    <div class="descricao-container">
        <div class="descricao-card">

            <h2>Descrição do Lançamento</h2>

            <div class="info">
                <p><strong>ID:</strong> <?= htmlspecialchars($lancamento["id"]) ?></p>
                <p><strong>Tipo:</strong> <?= htmlspecialchars($lancamento["tipo"]) ?></p>
                <p><strong>Data:</strong> <?= date('d/m/Y', strtotime($lancamento['data'])) ?></p>
                <p><strong>Categoria:</strong> <?= htmlspecialchars($lancamento['categoria']) ?></p>
                <p><strong>Congregação:</strong> <?= htmlspecialchars($lancamento['congregacao']) ?></p>
                <p><strong>Nome:</strong> <?= htmlspecialchars($lancamento['nome']) ?></p>
                <p class="valor"><strong>Valor:</strong>
                    R$ <?= number_format($lancamento['valor'], 2, ',', '.') ?>
                </p>
            </div>

            <a href="movimentos.php" class="btn-voltar">← Voltar para Movimentos</a>

        </div>
    </div>
</body>

</html>