
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
        data: Array.isArray(data?.quartos) ? data.quartos : []
    };
}

export async function createRoom(nome, numero, qtd_cama_casal, qtd_cama_solteiro, preco, disponivel) {
    const dados = {
        nome, 
        numero, 
        qtd_cama_casal,
        qtd_cama_solteiro,
        preco, 
        disponivel
    };

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