<?php
require_once "conexao.php";

$dados = null;
$categorias = [
    "acerto" => "acerto",
    "EBD" => "EBD",
    "oferta" => "oferta",
    "dizimo" => "dizimo",
    "concessionaria" => "concessionaria",
    "imposto" => "imposto",
    "prebenda" => "prebenda",
    "ajuda de custo" => "ajuda de custo",
    "oferta missionaria" => "oferta missionaria",
    "despesa bancaria" => "despesa bancaria",
    "CIBEM" => "CIBEM",
    "anuidade" => "anuidade"
];

$congregacoes = [
    "Sede" => "Sede",
    "Jacupiranga" => "Jacupiranga",
    "Pariquera" => "Pariquera",
    "Iguape" => "Iguape",
    "Ilha Comprida" => "Ilha Comprida",
    "Itimirim" => "Itimirim",
    "Sete Barras" => "Sete Barras",
    "Cananeia" => "Cananéia",
    "Angatuba" => "Angatuba",
    "Serrote" => "Serrote",
    "Guaviruva" => "Guaviruva",
    "Barra do Ribeirão" => "Barra do Ribeirão",
    "Morangaba" => "Morangaba",
    "Jardim Alvorada" => "Jardim Alvorada",
    "Itapitangui" => "Itapitangui"
];

if (isset($_POST['buscar'])) {
    $id = $_POST['id'];

    $sql = "SELECT * FROM lancamentos WHERE id = ?";
    $stmt = mysqli_prepare($conexao, $sql);
    mysqli_stmt_bind_param($stmt, "i", $id);
    mysqli_stmt_execute($stmt);

    $resultado = mysqli_stmt_get_result($stmt);
    $dados = mysqli_fetch_assoc($resultado);

    // var_dump($dados);
    // exit;
}
?>

<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/sidebar.css">
    <title>Atualizar Lançamentos</title>
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
        <div class="container" style="width: 820px">

            <?php if (isset($_GET['sucesso'])): ?>
                <div style="background: #d4edda; padding:10px; margin-bottom:15px;">
                    Lançamento atualizado com sucesso!
                </div>
            <?php endif; ?>

            <h2>Buscar Lançamento</h2>

            <form method="POST">
                <input type="number" name="id" placeholder="Digite o ID" required>
                <button type="submit" name="buscar">Buscar</button>
            </form>

            <?php if ($dados): ?>

                <h2>Atualizar Lançamento</h2>

                <form method="POST" action="update_edicao.php">
                    <input type="hidden" name="id" value="<?= $dados['id'] ?>">

                    <label>Data:</label>
                    <input type="date" name="data" value="<?= $dados['data'] ?>" required>

                    <label>Tipo:</label>
                    <input type="text" name="tipo" value="<?= $dados['tipo'] ?>" required>

                    <select name="categoria" required>
                        <?php foreach ($categorias as $valor => $nome): ?>
                            <option value="<?= $valor ?>"
                                <?= (!empty($dados['categoria']) && $dados['categoria'] == $valor) ? 'selected' : '' ?>>
                                <?= $nome ?>
                            </option>
                        <?php endforeach; ?>
                    </select>

                    <select name="congregacao" required>
                        <?php foreach ($congregacoes as $valor => $nome): ?>
                            <option value="<?= $valor ?>"
                                <?= (!empty($dados['congregacao']) && $dados['congregacao'] == $valor) ? 'selected' : '' ?>>
                                <?= $nome ?>
                            </option>
                        <?php endforeach; ?>
                    </select>

                    <label>Nome:</label>
                    <input type="text" name="nome" value="<?= $dados['nome'] ?>" required>

                    <label>Valor:</label>
                    <input type="number" step="0.01" name="valor" value="<?= $dados['valor'] ?>" required>

                    <button type="button" onclick="abrirModal()">Atualizar</button>

                    <div id="modalConfirmacao" class="modal">
                        <div class="modal-conteudo">
                            <h3>Confirmar Atualização</h3>
                            <p>Tem certeza que deseja atualizar este lançamento?</p>

                            <div class="modal-botoes">
                                <button type="button" id="debito" onclick="fecharModal()">Cancelar</button>
                                <button type="submit" style="background-color: #2e7d32;">Confirmar</button>
                            </div>
                        </div>
                    </div>
                </form>

            <?php endif; ?>
        </div>
    </main>
    <script>
        function abrirModal() {
            document.getElementById("modalConfirmacao").style.display = "block";
        }

        function fecharModal() {
            document.getElementById("modalConfirmacao").style.display = "none";
        }

        // Fecha se clicar fora do modal
        window.onclick = function(event) {
            let modal = document.getElementById("modalConfirmacao");
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    </script>
</body>

</html>