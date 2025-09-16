
import Card from "../components/RoomCard.js";
import Hero from "../components/Hero.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import DateSelector from "../components/DateSelector.js";

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

    const card = Card();
    divRoot.appendChild(card);

    const foot = document.getElementById('footer');
    foot.innerHTML = '';
    
    const footer = Footer();
    foot.appendChild(footer);
}