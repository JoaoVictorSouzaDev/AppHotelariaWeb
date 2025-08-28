<?php

class UserModel {
    public static function validateUser($conn, $email, $password) {
        $sql = "SELECT usuarios.id, usuarios.nome, usuarios.email, usuarios.senha, funcoes.nome AS cargo FROM usuarios JOIN funcoes ON usuarios.fk_funcoes = funcoes.id  WHERE usuarios.email = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($user = $result->fetch_assoc()) {
            if ($user['senha'] === $password) {
                unset($user['senha']);
                return $user;
            }
        }
        return false;
    }
}

?>