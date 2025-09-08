import { loginRequest, saveToken } from "../api/authAPI.js";
import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
 
export default function renderLoginPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
    
    const navbar = Navbar();
    nav.appendChild(navbar);

    const formulario = Form();

    const linkVoltar = document.createElement('a');
    linkVoltar.textContent = "Não possui uma conta? Cadastre-se";
    linkVoltar.href = 'register';
    linkVoltar.style.textAlign = 'center';
    linkVoltar.style.fontSize = '16px';
    linkVoltar.style.padding = '15px';

    const contentForm = formulario.querySelector('form');
    contentForm.insertBefore(linkVoltar, contentForm.children[3]);

    //Inputs e botão submit
    const inputEmail = contentForm.querySelector('input[type="email"]');
    const inputSenha = contentForm.querySelector('input[type="password"]');
    const btn = contentForm.querySelector('button[type="submit;"]');

    //Monitora o clique no botão
    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();

        try {
            const result = await loginRequest(email, senha);
            saveToken(result.token);
            //window.location.pathname = "AppHotelariaWeb/home";
        } 
        catch {
            console.log("Erro");
        } 
    });

    const footers = Footer();
    footer.appendChild(footers);
}