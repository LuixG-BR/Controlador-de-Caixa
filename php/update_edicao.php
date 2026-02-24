<?php
require_once "conexao.php";

$id = $_POST['id'];
$data = $_POST['data'];
$tipo = $_POST['tipo'];
$categoria = $_POST['categoria'];
$congregacao = $_POST['congregacao'];
$nome = $_POST['nome'];
$valor = $_POST['valor'];

$sql = "UPDATE lancamentos 
        SET data = ?, 
            tipo = ?, 
            categoria = ?, 
            congregacao = ?, 
            nome = ?, 
            valor = ?
        WHERE id = ?";

$stmt = mysqli_prepare($conexao, $sql);

mysqli_stmt_bind_param(
    $stmt,
    "sssssdi",
    $data,
    $tipo,
    $categoria,
    $congregacao,
    $nome,
    $valor,
    $id
);

mysqli_stmt_execute($stmt);
if (mysqli_stmt_execute($stmt)) {
    header("Location: editar_lancamento.php?sucesso=1");
    exit;
} else {
    echo "Erro ao atualizar.";
}
