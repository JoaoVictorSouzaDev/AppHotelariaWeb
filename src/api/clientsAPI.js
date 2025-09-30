
    export async function createClient(nome, cpf, telefone, email, senha) {
        const dados = {nome, cpf, telefone, email, senha}
            const response = await fetch("api/client", {
            method: "POST",
            headers: {
                "Accept" : "application/json",
                "Content-Type": "application/json"
            },
            body : JSON.stringify(dados),
            credentials: "same-origin"
        });

        let data = null;
        try {
            data = await response.json();
        }

        catch{
            data = null;
        }
        return {
            ok: true,
            // token: data.token,
            raw: data
        }
    }