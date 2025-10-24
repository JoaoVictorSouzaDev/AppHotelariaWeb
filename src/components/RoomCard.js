/* Arrumar
function calcularDiaria(checkIn, checkOut) {
    const checkIn = "2026-01-01";
    const checkIn = "2026-01-08";

    const [yin, min, din] = String(checkIn).split("-").map(Number);
    const [yout, mout, dout] = String(checkOut).split("-").map(Number);

    const tin = Date.UTC(yin, min -1, din);
    const tout = Date.UTC(yout, mout -1, dout);

}
*/

export default function RoomCard(itemCard, i = 0) {
    const {
        nome,
        qtd_cama_casal,
        qtd_cama_solteiro,
        preco,
        fotos
    } = itemCard || {};

    let fotoPrincipal = fotos && fotos.length > 0 ? fotos[0] : 'FotoCard1.jpeg';
    
    const title = nome;
    
    const camas = [
        (qtd_cama_casal > 0 ? `${qtd_cama_casal} cama(s) de casal` : null),
        (qtd_cama_solteiro > 0 ? `${qtd_cama_solteiro} cama(s) de solteiro` : null),
    ].filter(Boolean).join(' - ');
    
    const precoQuarto = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(preco || 0); 

    const containerCard = document.createElement('div');
    containerCard.className = 'col-md-4 mb-4'; 

    containerCard.innerHTML =
    `
    <div class="card h-100 shadow-sm border-0">
        <img src="uploads/${fotoPrincipal}" class="card-img-top" alt="Imagem do Quarto ${title}">
        <div class="card-body d-flex flex-column">
            
            <!-- Título (Nome do Quarto) e Número -->
            <h5 class="card-title text-primary">${title}</h5>
            
            <!-- Detalhes das Camas -->
            <p class="card-text text-muted flex-grow-1">
                ${camas || 'Detalhes das camas não especificados.'}
            </p>
            
            <!-- Preço e Botão de Ação -->
            <div class="d-flex justify-content-between align-items-center mt-auto pt-3 border-top">
                <span class="h4 text-success">${precoQuarto} / Noite</span>
                <a href="#" class="btn btn-primary">Reservar</a>
            </div>
        </div>
    </div>
    `;

    return containerCard;
}
