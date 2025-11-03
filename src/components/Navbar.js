import {getAuthenticatedUserCargo} from "../store/authstore.js";

export default function Navbar() {

    const userCargo = getAuthenticatedUserCargo(); 
    const shouldShowRooms = (userCargo !== 'cliente'); 
    const roomLinkHTML = `
        <li class="nav-item">
            <a class="nav-link" href="room">Quartos</a>
        </li>
    `;

    const navbar = document.createElement('div');
    navbar.className = "navbarTop"
    navbar.innerHTML = 
    `
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
            <a class="navbar-brand" href="home">
            <img src="public/assets/images/LogoHotelBlack.png" style = "width: 30px; height: 30px;"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                <a class="nav-link active" aria-current="page" href="home">Home</a>
                </li>
 
                <li class="nav-itepsm">
                <a class="nav-link" href="login">Login</a>
                </li>

                ${shouldShowRooms ? roomLinkHTML : ''}

            </ul>

            <a class="nav-link" href="car">
                <i class="bi bi-cart fs-3 me-4"></i>
            </a>

            </div>
        </div>
    </nav>
    `;

    return navbar;
}


