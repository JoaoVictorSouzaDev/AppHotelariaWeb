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
    const url = (location.pathname || "").replace("/AppHotelariaWeb/", "/").trim();
    console.log(url);
    return url && url.startsWith("/") ? url : "/home";
}

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/home"];
    render();
}

document.addEventListener('DOMContentLoaded', renderRoutes);