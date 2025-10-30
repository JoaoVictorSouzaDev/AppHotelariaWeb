<?php

    class ClientModel {

        public static function listAll($conn) {
            $sql = "SELECT id, nome, cpf, telefone, email, fk_funcoes FROM clientes";
            $result = $conn->query($sql);

            return $result->fetch_all(MYSQLI_ASSOC);
        }

        public static function searchById($conn, $id) {
            $sql = "SELECT id, nome, cpf, telefone, email, fk_funcoes FROM clientes WHERE id= ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);
            $stmt->execute();

            return $stmt->get_result()->fetch_assoc();
        }

        public static function create($conn, $data) {
            $sql = "INSERT INTO  clientes (nome, cpf, telefone, email, senha) VALUES (?, ?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
                "sssss",
                $data["nome"],
                $data["cpf"],
                $data["telefone"],
                $data["email"],
                $data["senha"]
            );

            return $stmt->execute();
        }

        public static function update($conn, $id, $data) {
            $sql = "UPDATE clientes SET nome=?, cpf=?, telefone=?, email=?, senha=?, fk_funcoes=? WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param(
                "sssssii",
                $data["nome"],
                $data["cpf"],
                $data["telefone"],
                $data["email"],
                $data["senha"],
                $data["fk_funcoes"],
                $id
            );

            return $stmt->execute();
        }

        public static function delete($conn, $id) {
            $sql = "DELETE FROM clientes WHERE id= ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("i", $id);

            return $stmt->execute();
        }

        public static function validateClient($conn, $email, $password) {
            $sql = "SELECT clientes.id, clientes.email, clientes.senha, clientes.nome, funcoes.nome AS cargo
            FROM clientes JOIN funcoes ON clientes.fk_funcoes = funcoes.id WHERE clientes.email = ?";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("s", $email);
            $stmt->execute();
            $result = $stmt->get_result();
    
            if($client = $result->fetch_assoc()) {
            
                if(PasswordController::validateHash($password, $client['senha'])) {
                    unset($client['senha']);
                    return $client;  
                }

            return false;
            }
        }
    }

?>
