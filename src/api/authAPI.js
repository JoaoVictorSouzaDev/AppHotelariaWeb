
    export async function loginRequest(email, senha) {

        const dados = {email, senha};
        const response = await fetch("api/login", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body : JSON.stringify(dados),
            credentials: "same-origin"
        });

        if (!response.ok) {
            let errorData = null;
            try {
                errorData = await response.json();
            } catch {}
            
            const message = errorData?.message || "O servidor retornou um erro inesperado.";
            return {ok: false, token: null, raw: errorData, message};
        }

        let data = null;
        try {
            data = await response.json();
        }

        catch{
            data = null;
        }
    
        if (!data || !data.token || !data.tipoUsuario) {
            const message = "Resposta de sucesso do servidor com dados incompletos.";
            return {ok: false, token: null, raw: data, message};
        }

        return {
            ok: true,
            token: data.token,
            raw: data
        }
    }

    export function saveToken(token) {
        localStorage.setItem("auth_token", token);
    }

    export function getToken(token) {
        return localStorage.getItem("auth_token");
    }

    export function clearToken() {
        localStorage.removeItem("auth_token");
    }
