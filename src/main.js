import renderHeroPage from "./pages/Home.js";
import renderLoginPage from "./pages/Login.js";
import renderRegisterPage from "./pages/Register.js"; 
import renderCarPage from "./pages/Car.js"; 

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/home": renderHeroPage,
    "/car" : renderCarPage
};

function getPath() {
    const pathParts = location.pathname.split('/').filter(Boolean);
    pathParts.shift();
    const path = '/' + pathParts.join('/');
    return path;
}

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/home"];
    render();
}

document.addEventListener('DOMContentLoaded', renderRoutes);