export async function finishedOrder(){
    const url = "api/order/reservation";
 
    const body = {
       pagamento: "pix",
       quartos: getTotalItems.map(it => (
        {
         id: it.roomId,
         inicio: it.checkIn,
         fim: it.checkOut
        }
       ))
};
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        credentials : "same-origin",
        body: JSON.stringify(body)
    });

    let data = null;

    try {
        data = await res.json();
    }
 
    catch { data = null;}

    if(!data){
        const message = `Erro ao enviar pedido: ${res.status}`;
        return {ok: false, raw: data, message};}
    return {
        ok: true,
        raw: data
    }
}