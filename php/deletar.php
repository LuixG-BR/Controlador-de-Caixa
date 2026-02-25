<?php
include_once "conexao.php";

$id_delete = $_POST['id_delete'];
$sql_delete = "DELETE FROM lancamentos WHERE id = ?";
$stmt_delete = mysqli_prepare($conexao, $sql_delete);
mysqli_stmt_bind_param($stmt_delete, 'i', $id_delete);
mysqli_stmt_execute($stmt_delete);
if (mysqli_stmt_execute($stmt_delete)) {
    header("Location: editar_lancamento.php?sucesso=1");
    exit;
} else {
    echo "Erro ao Deletar.";
}
