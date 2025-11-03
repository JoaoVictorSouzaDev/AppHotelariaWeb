import { removeItemFromHotel_Cart} from "../store/cartStore.js";
import {finishedOrder} from "../api/orderAPI.js" 

 
function mostrarPopupPagamento() {
    return new Promise((resolve) => {
        const modal = document.createElement('div');
        modal.className = 'modal fade show d-block';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
       
        modal.innerHTML = `
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Selecione o Método de Pagamento</h5>
                    </div>
                    <div class="modal-body">
                        <div class="form-check mb-3">
                            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoCartao" value="Crédito" checked>
                            <label class="form-check-label" for="pagamentoCartao">
                                Cartão de Crédito
                            </label>
                        </div>

                        <div class="form-check mb-3">
                            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoCartao" value="Débito" checked>
                            <label class="form-check-label" for="pagamentoCartao">
                                Cartão de Débito
                            </label>
                        </div>
                        
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="pagamento" id="pagamentoPix" value="pix">
                            <label class="form-check-label" for="pagamentoPix">
                                PIX
                            </label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary btn-cancelar">Cancelar</button>
                        <button type="button" class="btn btn-primary btn-confirmar">Confirmar</button>
                    </div>
                </div>
            </div>
        `;
 
        document.body.appendChild(modal);
 
        const btnConfirmar = modal.querySelector('.btn-confirmar');
        const btnCancelar = modal.querySelector('.btn-cancelar');
 
        btnConfirmar.addEventListener('click', () => {
            const metodoSelecionado = modal.querySelector('input[name="pagamento"]:checked').value;
            document.body.removeChild(modal);
            resolve(metodoSelecionado);
        });
 
        btnCancelar.addEventListener('click', () => {
            document.body.removeChild(modal);
            resolve(null);
        });
    });
}
 
export default function Grid(cartItems = [], onUpdateCart) {

    const Grid = document.createElement('div');
    Grid.className = "grid";

    const items = Array.isArray(cartItems) ? cartItems : [];

    if (items.length === 0) {
        Grid.innerHTML = `
            <div class="alert alert-info text-center mt-4">
                <h4>🛒 Seu carrinho está vazio!</h4>
                <p>Adicione quartos para visualizar o resumo da sua reserva.</p>
            </div>
        `;
        return Grid;
    }

    const totalGeral = items.reduce((total, item) => total + (item.subtotal || 0), 0);
    const totalFormatado = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalGeral);

    const linhasQuartos = items.map((item, index) => `
        <tr data-item-index="${index}">
            <td class="border-right d-flex justify-content-between align-items-start">
                <div class="d-flex flex-column">
                    <h6 class="mb-1">${item.nome || 'Quarto Sem Nome'}</h6>
                    <small class="text-muted">
                        ${item.checkIn || 'Data?'} a ${item.checkOur || 'Data?'} | ${item.daily || 0} diária(s)
                    </small>
                </div>
                <button 
                    class="btn btn-sm btn-outline-danger ms-3 remove-item" 
                    data-item-index="${index}"
                    title="Remover item"
                >
                    <i class="bi bi-trash"></i> 
                </button>
            </td>
            <td class="border-right align-middle">
                ${item.guest || 1} ${item.guest === 1 ? 'hóspede' : 'hóspedes'}
            </td>
            <td class="border-right text-center align-middle">
                ${new Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(item.subtotal || 0)}
            </td>
        </tr>
    `).join('');

    Grid.innerHTML = 
    `
    <table class="table" id="carrinho-quartos-tabela">
        <thead>
            <tr class="table-danger">
            <th scope="col" class="border-right w-50">Categoria do Quarto</th>
            <th scope="col" class="border-right w-25">Hóspedes</th>
            <th scope="col" class="border-right w-25">Preço Total</th>
            </tr>
        </thead>
        <tbody>
            ${linhasQuartos}
            
            <tr>
                <td></td>
                <td class="text-end border-right">
                    <button type="submit" class="btn btn-primary btn-finalizar-reserva">Reservar agora</button>
                </td>
                <td class="border-right text-center total" >
                    ${totalFormatado}
                </td>
            </tr>
        </tbody>
    </table>
    `;

    Grid.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (event) => {
            const itemIndex = parseInt(event.currentTarget.getAttribute('data-item-index'));
            removeItemFromHotel_Cart(itemIndex); 
            
            if (typeof renderCarPage !== 'undefined') {
                 renderCarPage();
            } else {
                 window.location.reload(); 
            }
        });
    });

    const btnFinalizar = Grid.querySelector('.btn-finalizar-reserva');
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', async function() {
            const metodoPagamento = await mostrarPopupPagamento();
            
            if (!metodoPagamento) {
                return;
            }
    
            this.disabled = true;
            this.textContent = "Processando...";
            
            const success = await finishedOrder(items, metodoPagamento);
            
            if (success && onUpdateCart) {
                onUpdateCart();
            } else {
                this.disabled = false;
                    this.textContent = "Finalizar Reserva";
            }
        });
    }

    return Grid;
}
