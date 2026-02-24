<?php
include_once "conexao.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data        = $_POST['data'] ?? null;
    $categoria   = $_POST['categoria'] ?? null;
    $congregacao = "sede";
    $nome        =  $_POST['nome'] ?? null;
    $valor       = $_POST['valor'] ?? null;
    $tipo        = 'debito';

    if ($data && $categoria && $congregacao && $nome && $valor) {

        $sql = "INSERT INTO lancamentos
                (data, tipo, categoria, congregacao, nome, valor)
                VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = mysqli_prepare($conexao, $sql);
        mysqli_stmt_bind_param(
            $stmt,
            "sssssd",
            $data,
            $tipo,
            $categoria,
            $congregacao,
            $nome,
            $valor
        );

        if (mysqli_stmt_execute($stmt)) {
            echo "Cadastro realizado com sucesso!";
        } else {
            echo "Erro no cadastro: " . mysqli_error($conexao);
        }

        mysqli_stmt_close($stmt);
    } else {
        echo "Preencha todos os campos!";
    }
}

mysqli_close($conexao);
?>


<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css" type="text/css">
    <link rel="stylesheet" href="../css/sidebar.css" type="text/css">
    <title>Cadastrar Credito</title>
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
                <a href="editar_lancamento.php">✏️ Atualizar Lançamento</a>
            </li>
            <hr>
            <li>
                <a href="movimentos.php">Movimentos</a>
            </li>
            <li>
                <a href="relatorios.php">Relatorios</a>
            </li>
        </ul>
    </div>
    <main class="main">
        <div class="container">
            <h1 class="debito">Cadastrar Debito/Saida</h1>
            <form method="post">
                <label>Data:</label>
                <input type="date" name="data" required>

                <label>Categoria</label>
                <select name="categoria">
                    <option value="concessionaria">concessionaria</option>
                    <option value="imposto">imposto</option>
                    <option value="prebenda">prebenda</option>
                    <option value="ajuda de custo">ajuda de custo</option>
                    <option value="oferta missionaria">oferta missionaria</option>
                    <option value="despesa bancaria">despesa bancaria</option>
                    <option value="CIBEM">CIBEM</option>
                    <option value="Anuidade">Anuidade</option>
                </select>

                <input type="text" name="nome" placeholder="Digite a Identificação Ex.: Elektro">
                <input type="number" name="valor" step="0.01" placeholder="Digite o valor da Entrada" required>

                <button id="debito">Cadastrar</button>
            </form>
        </div>
    </main>
</body>

</html>