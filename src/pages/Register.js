import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";

export default function renderRegisterPage() {
    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const formulario = Form();

    const titulo = formulario.querySelector('h1');
    titulo.textContent = "Cadastre-se";

    const btnRegister = formulario.querySelector('button');
    btnRegister.textContent = 'Cadastrar';

    const linkVoltar = document.querySelector('a');
    linkVoltar.textContent = 'Voltar a login'

    const contentForm = formulario.querySelector('form');

    //Novos Elementos
    const nome = document.createElement('input');
    nome.type = 'text';
    nome.placeholder = "Digite seu nome";

    const inputEmail = formulario.querySelector('input[type="email"]');
    contentForm.insertBefore(nome, inputEmail);

    const conSenha = document.createElement('input');
    conSenha.type = 'password';
    conSenha.placeholder = "Confirme sua senha";

    contentForm.insertBefore(conSenha, contentForm.children[3]);


}