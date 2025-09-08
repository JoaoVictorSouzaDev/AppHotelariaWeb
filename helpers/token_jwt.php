<?php 

    require_once __DIR__ . "/jwt/jwt_include.php";

    use Firebase\JWT\JWT;
    use Firebase\JWT\Key;
    
    function createToken($user) {
        $payload = [
            "iss" => "AppHotelariaWeb",
            "iat" => time(),
            "exp" => time() + (60 * (60 * 1)),
            "sub" => $user
        ];
        return JWT::encode($payload, SECRET_KEY, "HS256");
    }

    function validateToken($token) {
        try {
            $key = new Key(SECRET_KEY, "HS256");
            $decode = JWT::decode($token, $key);
            return $decode->$sub;
        }
        catch (Exeption $error) {
            return false;
        }
    }

?>