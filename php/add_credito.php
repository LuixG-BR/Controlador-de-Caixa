<?php
include_once "conexao.php";

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $data        = $_POST['data'] ?? null;
    $categoria   = $_POST['categoria'] ?? null;
    $congregacao = $_POST['congregacao'] ?? null;
    $nome        = $_POST['nome'] ?? null;
    $valor       = $_POST['valor'] ?? null;
    $tipo        = 'credito';

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
            <a class="navbar-brand" href="#">Cadastrar Crédito</a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#menu">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="menu">
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="../principal.html">🏠 Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="add_debito.php">➖ Débito</a>
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

                <h4 class="text-center mb-4">Adicionar Entrada</h4>

                <form method="post">

                    <div class="mb-3">
                        <label class="form-label">Data</label>
                        <input type="date" name="data" class="form-control" value="<?= date('Y-m-d') ?>">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Categoria</label>
                        <select name="categoria" class="form-select">
                            <option value="Oferta">Oferta</option>
                            <option value="Dízimo">Dízimo</option>
                            <option value="Acerto">Acerto</option>
                            <option value="EBD">EBD</option>
                            <option value="CIBEM">CIBEM</option>
                            <option value="Anuidade">Anuidade</option>
                            <option value="oferta missionaria">Oferta Missionária</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Congregação</label>
                        <select name="congregacao" class="form-select">
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
                            <option value="Morangaba">Morangaba</option>
                            <option value="Jardim Alvorada">Jardim Alvorada</option>
                            <option value="Itapitangui">Itapitangui</option>
                        </select>
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Nome</label>
                        <input type="text" name="nome" class="form-control" placeholder="Digite o nome">
                    </div>

                    <div class="mb-3">
                        <label class="form-label">Valor</label>
                        <input type="number" name="valor" step="0.01" class="form-control" placeholder="Digite o valor da entrada" required>
                    </div>

                    <button type="submit" class="btn btn-success w-100">
                        Cadastrar
                    </button>

                </form>

            </div>
        </div>
    </main>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>