import { getToken } from "./authAPI";

export async function listRoomsRequest(inicio, fim, qtdPessoas) {
    const token = getToken();
    const dados = {inicio, fim, qtdPessoas};

    const response = await fetch("api/rooms", {
        method: "POST",
        headers: {
            "Accept" : "application/json",
            "Content-Type": "application/json"
        },
        credentials: "same-origin"
    });

    let data = null;

    try {
        data = await response.json();
    } catch {
        data = null;
    }

    if (!response.ok) {
        const message = data?.message || "Erro desconhecido ao criar o quarto.";
        return { ok: false, data: null, message };
    }

    return {
        ok: true,
        data: data 
    }
}