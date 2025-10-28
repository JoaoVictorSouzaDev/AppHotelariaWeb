import CardLounge from "../components/CardLounge.js"
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import DateSelector from "../components/DateSelector.js";
import {listAvaibleRoomsRequest} from "../api/roomsAPI.js";
import RoomCard from "../components/RoomCard.js";

export default function renderHeroPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    const hero = Hero();
    divRoot.appendChild(hero);

    const tituloCard = document.createElement('h1');
    tituloCard.textContent = 'Conheça nossos quartos'
    tituloCard.className = 'titulo';
    tituloCard.style.fontSize = '28px';
    tituloCard.style.textAlign = 'center';
    tituloCard.style.marginTop = '2%';
    divRoot.appendChild(tituloCard)

    const subTituloCard = document.createElement('h2');
    subTituloCard.textContent = 'Selecione o período da sua estadia e descubra os quartos perfeitos para você.'
    subTituloCard.className = 'subTitulo';
    subTituloCard.style.fontSize = '18px';
    subTituloCard.style.textAlign = 'center';
    divRoot.appendChild(subTituloCard);

    const dateSelector = DateSelector()
    divRoot.appendChild(dateSelector);

    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardDiv';
    cardDiv.id = 'cards-result';

    divRoot.appendChild(cardDiv);

    const tituloLounge = document.createElement('h1');
    tituloLounge.textContent = 'Nossa infraestrutura'
    tituloLounge.className = 'titulo';
    tituloLounge.style.fontSize = '28px';
    tituloLounge.style.textAlign = 'center';
    tituloLounge.style.marginTop = '2%';
    divRoot.appendChild(tituloLounge);

    const cardLoungeDiv = document.createElement('div');
    cardLoungeDiv.className = 'cardLoungeDiv';
    cardLoungeDiv.style.marginTop = '2%';
    divRoot.appendChild(cardLoungeDiv);

    const loungeItems = [
        {path: "FotoReustarante.jpeg", title: "Restaurante", text: "Nosso restaurante é um espaço agradavel e familiar!"},
        {path: "FotoSpa.jpeg", title: "SPA", text: "Nosso SPA é ideal para momentos de relaxamento!"},
        {path: "FotoBar.jpeg", title: "Bar", text: "Nosso bar oferece drinks sem metanol, confia!"}
    ];
    for (let i = 0; i < loungeItems.length; i++) {
        const cardLoungeElement = CardLounge (loungeItems[i], i);
        cardLoungeDiv.appendChild(cardLoungeElement);
    }

    const btnSearch= dateSelector.querySelector('.js-search-button');

    function toggleErrorState(errorElement, inputElement, message = null) {
        if (message) {
            errorElement.textContent = message;
            errorElement.classList.add('error-message');
            inputElement.classList.add('input-error');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('error-message');
            inputElement.classList.remove('input-error');
        }
    }

    btnSearch.addEventListener("click", async (e) => {
        e.preventDefault();

        const CheckIn = dateSelector.querySelector('.js-check-in-input');
        const CheckOut = dateSelector.querySelector('.js-check-out-input');
        const guestsAmount = dateSelector.querySelector('.js-guests-amount');
        const erroCheckIn = dateSelector.querySelector('.js-erro-checkin');
        const erroCheckOut = dateSelector.querySelector('.js-erro-checkout');
        const erroGuestsAmount = dateSelector.querySelector('.js-erro-guests-amount');

        const inicio = CheckIn.value.trim();
        const fim = CheckOut.value.trim();
        const qtdPessoas = parseInt(guestsAmount.value, 10);

        const dtInicio = new Date(inicio);
        const dtFim = new Date(fim);

        let hasValidationErrors = false;

        toggleErrorState(erroCheckIn, CheckIn);
        toggleErrorState(erroCheckOut, CheckOut);
        toggleErrorState(erroGuestsAmount, guestsAmount);

        if (!inicio) {
            toggleErrorState(erroCheckIn, CheckIn, 'Data de Check-in é obrigatória.');
            hasValidationErrors = true;
        } 

        if (dtInicio >= dtFim) {
            toggleErrorState(erroCheckIn, CheckIn, 'Check-in deve ser anterior ao Check-Out.');
            hasValidationErrors = true;
        }
        
        if (!fim) {
            toggleErrorState(erroCheckOut, CheckOut, 'Check-Out é obrigatória.');
            hasValidationErrors = true;
        } 

        if (!guestsAmount.value.trim() || isNaN(qtdPessoas) || qtdPessoas <= 0) {
            toggleErrorState(erroGuestsAmount, guestsAmount, 'Quantidade de pessoas ');
            hasValidationErrors = true;
        }
        
        if (hasValidationErrors) {
            return; 
        }

        btnSearch.disabled = true;
        btnSearch.textContent = 'Buscando...';

        const result = await listAvaibleRoomsRequest(inicio, fim, qtdPessoas);
        console.log(result.data);

        btnSearch.disabled = false;
        btnSearch.style.backgroundColor = ''; 
        btnSearch.textContent = 'Pesquisar';

        if (result.ok) {
            cardDiv.innerHTML = '';
            result.data.forEach((itemCard, i) => {
            cardDiv.appendChild(RoomCard(itemCard, i));
        });

        } else {
            console.error("Erro na busca de quartos:", result.message);
        }

    });

    const foot = document.getElementById('footer');
    foot.innerHTML = '';
    
    const footer = Footer();
    foot.appendChild(footer);
}