
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

    const card = Card();
    divRoot.appendChild(card);

    const foot = document.getElementById('footer');
    foot.innerHTML = '';
    
    const footer = Footer();
    divRoot.appendChild(footer);
}