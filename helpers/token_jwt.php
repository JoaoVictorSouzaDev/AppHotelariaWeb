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
            return $decode->sub;
        }
        catch (Exception $error) {
            return false;
        }
    }

    function validateTokenAPI() {
        $headers = getallheaders();
        if (!isset($headers['Authorization'])) {
            jsonResponse(['message' => 'Token Ausente'], 401);
            exit;
        }
        $token = str_replace("Bearer ", "", $headers["Authorization"]);
        if ( !validateToken($token) ) {
            jsonResponse(['message' => 'Token Invalido'], 401);
            exit;
        }
    }

?>