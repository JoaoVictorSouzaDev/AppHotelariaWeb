
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
    } catch (error) {
        // Se a resposta não tiver corpo ou não for JSON (e o status for 2xx), 'data' será 'null'
        // Se a resposta tiver status 4xx/5xx sem JSON, 'data' será 'null' e será tratado abaixo
    }
    
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
        data: data 
    };
}