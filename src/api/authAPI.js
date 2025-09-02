
export async function loginRequest(email, senha) {

    const response = await fetch("/api/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body:new URLSearchParams({email, senha}).toString(),
        /*URL da requisiçao é a mesma da origem dp front(mesmo protocolo http/mesmo dominio
        local/mesma porta 80 do servidoer web apache)
        Front: http://localhost/primesite/public/index.html
        Back: http://localhost/primesite/api/login.php
        */
       credentials: "same-origin"
    });

    //Interpreta a resposta como JSON
    let data = null;
    try {
        data = await response.json();
    }
    catch{
    // Se nao for JSON valido, data permanece null
        data = null;
    }
 
    return {
        ok: true,
        user: data.user ?? null,
        raw: data
    }
}
