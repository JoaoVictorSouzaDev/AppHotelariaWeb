import Card from "../components/RoomCard.js";
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import DateSelector from "../components/DateSelector.js";
import {listAvaibleRoomsRequest} from "../api/roomsAPI.js";

export default function renderHeroPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    const hero = Hero();
    divRoot.appendChild(hero);
    
    const dateSelector = DateSelector()
    divRoot.appendChild(dateSelector);

    const tituloCard = document.createElement('h1');
    tituloCard.textContent = 'Conheça nossos quartos'
    tituloCard.className = 'titulo';
    tituloCard.style.fontSize = '24px';
    tituloCard.style.textAlign = 'center';
    tituloCard.style.marginTop = '3%';
    divRoot.appendChild(tituloCard)

    const subTituloCard = document.createElement('h2');
    subTituloCard.textContent = 'Conforto e elegância que se unem para criar a sua experiência de estadia perfeita.'
    subTituloCard.className = 'subTitulo';
    subTituloCard.style.fontSize = '18px';
    subTituloCard.style.textAlign = 'center';
    divRoot.appendChild(subTituloCard);

    const btnSearch= dateSelector.querySelector('.js-search-button');
    const CheckIn = dateSelector.querySelector('.js-check-in-input');
    const CheckOut = dateSelector.querySelector('.js-check-out-input');
    const guestsAmount = dateSelector.querySelector('.js-guests-amount');
    const erroCheckIn = dateSelector.querySelector('js-erro-checkin');
    const erroCheckOut = dateSelector.querySelector('js-erro-checkout');
    const erroGuestsAmount = dateSelector.querySelector('js-erro-guests-amount');

    // Botão Date Selector
        btnSearch.addEventListener("click", async (e) => {
            e.preventDefault();

            const inicio = CheckIn.value;
            const fim = CheckOut.value;
            const qtdPessoas = parseInt(guestsAmount.value, 10);

            if (!inicio || !fim || !qtdPessoas || isNaN(qtdPessoas)) {
                console.log("Preencha os parametros:");
                return; 
            }

            btnSearch.disabled = true;
            btnSearch.textContent = 'Buscando...';

            const result = await listAvaibleRoomsRequest(inicio, fim, qtdPessoas);

            btnSearch.disabled = false;
            btnSearch.style.backgroundColor = '';
            btnSearch.textContent = 'Pesquisar';

            if (result.ok) {
                console.log("Quartos Disponíveis Encontrados:", result.data);
                
                //Renderizar quartos

            } else {
                console.error("Erro na busca de quartos:", result.message);
            }
        });

    const cardDiv = document.createElement('div');
    cardDiv.className = 'cardDiv';

    for (var i=0; i < 3; i++) {
        const card = Card();
        cardDiv.appendChild(card);
    }

    divRoot.appendChild(cardDiv);

    const foot = document.getElementById('footer');
    foot.innerHTML = '';
    
    const footer = Footer();
    foot.appendChild(footer);
}