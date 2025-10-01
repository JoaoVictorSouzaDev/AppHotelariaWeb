import Form from "../components/Form.js";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import {createClient} from "../api/clientsAPI.js";

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
    btnRegister.type = 'submit';

    const contentForm = formulario.querySelector('form');

    //Novos Elementos
    const inputNome = document.createElement('input');
    inputNome.type = 'text';
    inputNome.placeholder = "Digite seu nome";

    const inputEmail = formulario.querySelector('input[type="email"]');
    contentForm.insertBefore(inputNome, inputEmail);

    const conSenha = document.createElement('input');
    conSenha.type = 'password';
    conSenha.placeholder = "Confirme sua senha";
    contentForm.insertBefore(conSenha, contentForm.children[3]);

    const spanErroSenha = document.createElement('span');

    const inputCpf = document.createElement('input');
    inputCpf.type = 'text';
    inputCpf.placeholder = "Digite seu CPF";

    contentForm.insertBefore(spanErroSenha, contentForm.children[4]);

    contentForm.insertBefore(inputCpf, contentForm.children[5]);

    const inputTelefone = document.createElement('input');
    inputTelefone.type = 'text';
    inputTelefone.placeholder = "Digite seu Telefone";
    contentForm.insertBefore(inputTelefone, contentForm.children[6]);

    const inputSenha = contentForm.querySelector('input[type="password"]');

    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = inputNome.value.trim();
        const email = inputEmail.value.trim();
        const senha = inputSenha.value.trim();
        const confirmaSenha = conSenha.value.trim();
        const cpf = inputCpf.value.trim();
        const telefone = inputTelefone.value.trim();

        if(senha !== confirmaSenha) {
            spanErroSenha.textContent = 'As senhas não conferem!'
            spanErroSenha.style.color = 'red';
            spanErroSenha.style.fontSize = '14px';
            conSenha.style.borderBottom = '1px solid red';
            return;
        } 

        spanErroSenha.textContent = '';
        spanErroSenha.style.color = '';
        conSenha.style.borderBottom = '';

        try {
            const result = await createClient(nome, cpf, telefone, email, senha);
            //Mano Jeff tem que resolver
        } catch {
            console.log("Erro Inesperado");
        } 
    });

    console.log("Elemento Form sendo monitorado:", contentForm);

    const footer = document.getElementById('footer');
    footer.innerHTML = '';

    const footers = Footer();
    footer.appendChild(footers);
}