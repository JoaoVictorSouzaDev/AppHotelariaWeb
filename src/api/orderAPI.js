import { getToken} from "../api/authAPI.js";
import { clearHotel_Cart, getCart } from "../store/cartStore.js";

export async function finishedOrder(cartItems, metodoPagamento){
    try {
        const token = getToken();
       
        if (!token) {
            alert("Você precisa estar logado para fazer uma reserva");
            return false;
        }
 
        const reservaData = {
            pagamento: metodoPagamento,
            quartos: cartItems.map(item => ({
                id: item.id,
                inicio: item.checkIn,
                fim: item.checkOur,
                qtd_hospedes: item.guest,
                preco_total: item.subtotal
            }))
        };

        const response = await fetch("api/request/reservation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(reservaData),
            credentials: "include"
        });

        const result = await response.json();
 
        if (response.ok) {
            alert("Reserva realizada com sucesso!");
            clearHotel_Cart();
            window.location.reload();
            return true;
        } else {
            alert("Erro ao realizar reserva: " + (result.message || "Erro desconhecido"));
            return false;
        }
 
    } catch (error) {
        console.error("Erro na reserva:", error);
        alert("Erro de comunicação ao tentar reservar");
        return false;
    }
}