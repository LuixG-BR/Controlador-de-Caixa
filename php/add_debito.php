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
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <title>Cadastrar Credito</title>
</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Cadastrar Débito</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../principal.html">🏠 Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="add_credito.php">➕ Crédito</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="editar_lancamento.php">✏️ Editar</a>
                    </li>
                    <hr>
                    <li class="nav-item">
                        <a class="nav-link" href="movimentos.php">Movimentos</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="relatorios.php">Relatorios</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
    <main class="container-fluid px-3 mt-4">
        <div class="card shadow-sm">
            <div class="card-body">

                <h4 class="text-center mb-4 fw-bold">Cadastrar Débito</h4>

                <form method="post">

                    <div class="mb-3">
                        <label class="form-label">Data</label>
                        <input type="date" name="data" class="form-control" required>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Categoria</label>
                        <select name="categoria" class="form-select">
                            <option value="concessionaria">Concessionária</option>
                            <option value="imposto">Imposto</option>
                            <option value="prebenda">Prebenda</option>
                            <option value="ajuda de custo">Ajuda de custo</option>
                            <option value="oferta missionaria">Oferta missionária</option>
                            <option value="despesa bancaria">Despesa bancária</option>
                            <option value="CIBEM">CIBEM</option>
                            <option value="Anuidade">Anuidade</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Identificação</label>
                        <input type="text" name="nome" class="form-control" placeholder="Ex.: Elektro">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Valor</label>
                        <input type="number" name="valor" step="0.01" inputmode="decimal" class="form-control" placeholder="Digite o valor" required>
                    </div>

                    <button type="submit" class="btn btn-danger w-100 py-3">
                        Cadastrar Débito
                    </button>

                </form>

            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>