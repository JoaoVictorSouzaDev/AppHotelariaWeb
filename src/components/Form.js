export default function Form(){

    const divRoot = document.getElementById('root');
    divRoot.innerHTML = '';

    const container = document.createElement('div');
    container.className = 'card p-4 shadow-lg';
    container.style.width = '100%';
    container.style.maxWidth = '500px';
    divRoot.appendChild(container);

    const titulo = document.createElement('h1');
    titulo.textContent = 'Faça seu login';
    titulo.className = 'titulo';
    titulo.style.textAlign = 'center';
    titulo.style.marginBottom = '25px';
    titulo.style.fontSize = '30px';
    container.appendChild(titulo); 

    const formulario = document.createElement('form');
    formulario.className = 'd-flex flex-column';

    const email = document.createElement('input');
    email.type = 'email';
    email.placeholder = "Digite seu e-mail";
    formulario.appendChild(email);

    const senha = document.createElement('input');
    senha.type = 'password';
    senha.placeholder = "Digite sua senha";
    formulario.appendChild(senha);

    const btn = document.createElement('button');
    btn.type = 'submit';
    btn.textContent = "Entrar";
    btn.className = 'btn btn-primary';
    btn.style.fontSize = '18px';
    formulario.appendChild(btn);

    container.appendChild(formulario);
    return divRoot;
}   
