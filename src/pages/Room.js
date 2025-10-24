import { createRoom } from "../api/roomsAPI.js";
import Navbar from "../components/Navbar.js";
import Form from "../components/Form.js";
import Footer from "../components/Footer.js";

function toggleErrorState(errorElement, inputElement, message = null) {
    if (message) {
        errorElement.textContent = message;
        errorElement.classList.add('error-message');
        inputElement.classList.add('input-error');
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('error-message');
        inputElement.classList.remove('input-error');
    }
}

//Criar API Imagens
//Limitar para operadores
export default function renderRoomPage() {

    const nav = document.getElementById('navbar');
    nav.innerHTML = '';
        
    const navbar = Navbar();
    nav.appendChild(navbar);

    const formulario = Form();

    const titulo = formulario.querySelector('h1');
    titulo.textContent = "Cadastrar um novo quarto";

    const contentForm = formulario.querySelector('form');

    const existingInputEmail = formulario.querySelector('.InputEmail');
    const existingInputSenha = formulario.querySelector('.InputSenha');
    const existingButton = formulario.querySelector('button');

    if (existingInputEmail) existingInputEmail.remove();
    if (existingInputSenha) existingInputSenha.remove();
    if (existingButton) existingButton.remove();

    const inputNome = document.createElement('input');
    inputNome.name = "nome";
    inputNome.className = "InputNome";
    inputNome.type = "text";
    inputNome.placeholder = "Nome do quarto";
    const erroNome = document.createElement('span');
    erroNome.className = "error-Nome";
    contentForm.appendChild(inputNome);
    contentForm.appendChild(erroNome);

    // 2. Número
    const inputNumero = document.createElement('input');
    inputNumero.name = "numero";
    inputNumero.className = "InputNumero";
    inputNumero.placeholder = "Numero do quarto";
    inputNumero.type = "text";
    const erroNumero = document.createElement('span');
    erroNumero.className = "error-Numero";
    contentForm.appendChild(inputNumero);
    contentForm.appendChild(erroNumero);

    // 3. Quantidade de Camas de Casal
    const inputCamaCasal = document.createElement('input');
    inputCamaCasal.name = "qtd_cama_casal";
    inputCamaCasal.placeholder = "Quantidade de camas de casal";
    inputCamaCasal.className = "InputCamaCasal";
    inputCamaCasal.type = "number";
    inputCamaCasal.min = "0";
    const erroCamaCasal = document.createElement('span');
    erroCamaCasal.className = "error-CamaCasal";
    contentForm.appendChild(inputCamaCasal);
    contentForm.appendChild(erroCamaCasal);

    // 4. Quantidade de Camas de Solteiro
    const inputCamaSolteiro = document.createElement('input');
    inputCamaSolteiro.name = "qtd_cama_solteiro";
    inputCamaSolteiro.placeholder = "Quantidade de camas de solteiro";
    inputCamaSolteiro.className = "InputCamaSolteiro";
    inputCamaSolteiro.type = "number";
    inputCamaSolteiro.min = "0";
    const erroCamaSolteiro = document.createElement('span');
    erroCamaSolteiro.className = "error-CamaSolteiro";
    contentForm.appendChild(inputCamaSolteiro);
    contentForm.appendChild(erroCamaSolteiro);

    // 5. Preço
    const inputPreco = document.createElement('input');
    inputPreco.name = "preco";
    inputPreco.placeholder = "Preço por noite em R$";
    inputPreco.className = "InputPreco";
    inputPreco.type = "number";
    inputPreco.step = "0.01";
    inputPreco.min = "0";
    const erroPreco = document.createElement('span');
    erroPreco.className = "error-Preco";
    contentForm.appendChild(inputPreco);
    contentForm.appendChild(erroPreco);

    // 6. Disponibilidade (Select)
    const selectDisponivel = document.createElement('select');
    selectDisponivel.name = 'disponivel';
    selectDisponivel.className = 'form-select InputDisponivel';

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

    const erroDisponivel = document.createElement('span');
    erroDisponivel.className = "error-Disponivel";
    
    contentForm.appendChild(selectDisponivel);
    contentForm.appendChild(erroDisponivel);

    // 7. File Input (Imagens)
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
    inputFileInput.name = 'fotos[]'; 
    divFileInput.appendChild(labelFile);
    divFileInput.appendChild(inputFileInput);

    contentForm.appendChild(divFileInput);

    // 8. Botão (Re-criação/re-inserção no final)
    const btnRegister = document.createElement('button');
    btnRegister.type = 'submit';
    btnRegister.className = existingButton ? existingButton.className : 'btn btn-primary';
    btnRegister.textContent = 'Cadastrar Quarto';
    contentForm.appendChild(btnRegister);

    contentForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        toggleErrorState(erroNome, inputNome);
        toggleErrorState(erroNumero, inputNumero);
        toggleErrorState(erroCamaCasal, inputCamaCasal);
        toggleErrorState(erroCamaSolteiro, inputCamaSolteiro);
        toggleErrorState(erroPreco, inputPreco);
        toggleErrorState(erroDisponivel, selectDisponivel);

        let hasValidationErrors = false;

        const nome = inputNome.value.trim();
        const numero = inputNumero.value.trim();
        const qtdCamaCasal = Number(inputCamaCasal.value);
        const qtdCamaSolteiro = Number(inputCamaSolteiro.value);
        const preco = Number(inputPreco.value);
        const disponivel = selectDisponivel.value;

        if (!nome) {
            toggleErrorState(erroNome, inputNome, 'O nome do quarto é obrigatório.');
            hasValidationErrors = true;
        }

        if (!numero) {
            toggleErrorState(erroNumero, inputNumero, 'O número do quarto é obrigatório.');
            hasValidationErrors = true;
        }

        if (inputCamaCasal.value.trim() === '' || isNaN(qtdCamaCasal) || qtdCamaCasal < 0) {
            toggleErrorState(erroCamaCasal, inputCamaCasal, 'Quantidade de camas de casal inválida.');
            hasValidationErrors = true;
        }

        if (inputCamaSolteiro.value.trim() === '' || isNaN(qtdCamaSolteiro) || qtdCamaSolteiro < 0) {
            toggleErrorState(erroCamaSolteiro, inputCamaSolteiro, 'Quantidade de camas de solteiro inválida.');
            hasValidationErrors = true;
        }

        if (inputPreco.value.trim() === '' || isNaN(preco) || preco <= 0) {
            toggleErrorState(erroPreco, inputPreco, 'Preço inválido. Deve ser maior que zero.');
            hasValidationErrors = true;
        }

        if (disponivel === '') {
            toggleErrorState(erroDisponivel, selectDisponivel, 'Selecione a disponibilidade.');
            hasValidationErrors = true;
        }

        if (hasValidationErrors) {
            return; 
        }

        const formData = new FormData(contentForm);

        formData.set('disponivel', selectDisponivel.value === 'true' ? 1 : 0);
        
        btnRegister.disabled = true;

        try {
            const result = await createRoom(formData);

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
        } finally {
            btnRegister.disabled = false;
        }
    });

    const footer = document.getElementById('footer');
    footer.innerHTML = '';
        
    const footers = Footer();
    footer.appendChild(footers);
}