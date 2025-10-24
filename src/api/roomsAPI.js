
export async function listAvaibleRoomsRequest(inicio, fim, qtdPessoas) {
    const dados = {inicio, fim, qtdPessoas};

    const response = await fetch("api/rooms", {
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
    } catch (error) {}
    
    if (!response.ok) {
        const message = data?.message || `Erro ${response.status}: Falha ao buscar quartos disponíveis.`;
        return { 
            ok: false, 
            data: null, 
            message 
        };
    }

    return {
        ok: true,
        data: Array.isArray(data?.Quartos) ? data.Quartos : []
    };
}

export async function createRoom(formData) {

    const response = await fetch("api/rooms", {
        method: "POST",
        headers: {
            "Accept" : "application/json",
        },

        body : formData,
        credentials: "same-origin"
    });

    let data = null;

    try {
        data = await response.json();
    } catch (error) {}
    
    if (!response.ok) {
        const message = data?.message || `Erro ${response.status}: Falha ao criar o quarto.`;
        return { 
            ok: false, 
            data: null, 
            message 
        };
    }

    return {
        ok: true,
        data: data, 
        message: data?.message || "Quarto criado com sucesso."
    };
}