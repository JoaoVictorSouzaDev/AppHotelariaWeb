import { createRoom } from "../api/roomsAPI.js";
import Navbar from "../components/Navbar.js";
import Form from "../components/Form.js";
import Footer from "../components/Footer.js";

export default function renderRoomPage() {

    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const formulario = Form();

    const titulo = formulario.querySelector('h1');
    titulo.textContent = "Cadastrar um novo quarto";

    const nome = formulario.querySelector('.InputEmail');
    nome.className = "InputNome";
    nome.type = "text";
    nome.placeholder = "Nome do quarto";

    const numero = formulario.querySelector('.InputSenha');
    numero.className = "InputNumero";
    numero.placeholder = "Numero do quarto";
    numero.type = "text";

    const contentForm = formulario.querySelector('form');

    const qtdCamaCasal = document.createElement('input');
    qtdCamaCasal.placeholder = "Quantidade de camas de casal";
    qtdCamaCasal.className = "InputCamaCasal";
    contentForm.insertBefore(qtdCamaCasal, contentForm.children[2]);

    const qtdCamaSolteiro = document.createElement('input');
    qtdCamaSolteiro.placeholder = "Quantidade de camas de solteiro";
    qtdCamaSolteiro.className = "InputCamaSolteiro";
    contentForm.insertBefore(qtdCamaSolteiro, contentForm.children[3]);

    const preco = document.createElement('input');
    preco.placeholder = "Preço por noite em R$";
    preco.className = "InputPreco";
    contentForm.insertBefore(preco, contentForm.children[4]);

    const selectDisponivel = document.createElement('select');
    selectDisponivel.className = 'form-select';

    const optionDefault = document.createElement('option');
    optionDefault.textContent = 'Disponibilidade';
    optionDefault.value = '';
    optionDefault.disabled = true;
    optionDefault.selected = true;
    selectDisponivel.appendChild(optionDefault);
    
    const optionSim = document.createElement('option');
    optionSim.textContent = 'Sim';
    optionSim.value = 'true';
    selectDisponivel.appendChild(optionSim);
    
    const optionNao = document.createElement('option');
    optionNao.textContent = 'Não';
    optionNao.value = 'false';
    selectDisponivel.appendChild(optionNao);

    const divFileInput = document.createElement('div');
    divFileInput.className = 'mb-3';

    const labelFile = document.createElement('label');
    labelFile.htmlFor = 'formFileMultiple'; 
    labelFile.className = 'form-label';

    const inputFileInput = document.createElement('input');
    inputFileInput.className = 'form-control';
    inputFileInput.type = 'file';
    inputFileInput.id = 'formFileMultiple'; 
    inputFileInput.multiple = true;      
    inputFileInput.name = 'room_images[]'; 
    divFileInput.appendChild(labelFile);
    divFileInput.appendChild(inputFileInput);

    contentForm.insertBefore(selectDisponivel, contentForm.children[5]);

    contentForm.insertBefore(divFileInput, contentForm.children[6]);

    const btnRegister = formulario.querySelector('button');
    btnRegister.textContent = 'Cadastrar Quarto';

    const inputNome = contentForm.querySelector('.InputNome');
    const inputNumero = contentForm.querySelector('.InputNumero');
    const inputCamaCasal = contentForm.querySelector('.InputCamaCasal');
    const inputCamaSolteiro = contentForm.querySelector('.InputCamaSolteiro');
    const inputPreco = contentForm.querySelector('.InputPreco');
    const inputDisponivel = contentForm.querySelector('.form-select');

    //Estilizar Input Arquivos
    //Criar API para inserir as imagens
    //Validadores Front e Back
    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nome = inputNome.value.trim();
        const numero = inputNumero.value.trim();
        const qtd_cama_casal = parseInt(inputCamaCasal.value.trim());
        const qtd_cama_solteiro = parseInt(inputCamaSolteiro.value.trim());
        const preco = parseFloat(inputPreco.value.trim());
        const disponivel = inputDisponivel.value.trim();

        try {
            const result = await createRoom(
                nome, 
                numero, 
                qtd_cama_casal, 
                qtd_cama_solteiro, 
                preco, 
                disponivel
            );
            
            if (result.ok) {
                console.log("Quarto Cadastrado com Sucesso!", result.data);
                alert("Quarto " + nome + " cadastrado com sucesso!"); 
                contentForm.reset(); 
            } else {
                console.error("Erro ao cadastrar quarto:", result.message);
                alert("Erro ao cadastrar quarto: " + result.message);
            }

        } catch (error) {
            console.error("Falha na comunicação com o servidor:", error.message || "Erro de rede.");
            alert("Falha ao tentar cadastrar: Erro de comunicação.");
        }
    });

    const footer = document.getElementById('footer');
    footer.innerHTML = '';
        
    const footers = Footer();
    footer.appendChild(footers);
}



