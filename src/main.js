import renderHeroPage from "./pages/Home.js";
import renderLoginPage from "./pages/Login.js";
import renderRegisterPage from "./pages/Register.js"; 

const routes = {
    "/login": renderLoginPage,
    "/register": renderRegisterPage,
    "/home": renderHeroPage
};

function getPath() {
    const url = (location.pathname || "").replace("/AppHotelariaWeb/", "/").trim();
    console.log(url);
    return url && url.startsWith("/") ? url : "/login";
}

function renderRoutes() {
    const url = getPath();
    const render = routes[url] || routes["/login"];
    render();
}

document.addEventListener('DOMContentLoaded', renderRoutes);