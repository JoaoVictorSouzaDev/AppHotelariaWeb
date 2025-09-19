export default function DateSelector() {

    const divDateSelector = document.createElement('div');
    divDateSelector.className = 'divDateSelector';

    const dateCheckIn = document.createElement('input');
    dateCheckIn.type = 'text'
    dateCheckIn.placeholder = 'Data Check-In'
    dateCheckIn.className = 'card p-3 shadow-lg inputDate';
    divDateSelector.appendChild(dateCheckIn);

    dateCheckIn.addEventListener('focus', function() {
    this.type = 'date';
    });

    dateCheckIn.addEventListener('blur', function() {
    if (!this.value) {
        this.type = 'text';
    }
    });

    const dateCheckOut = document.createElement('input');
    dateCheckOut.type = 'text'
    dateCheckOut.placeholder = 'Data Check-Out'
    dateCheckOut.className = 'card p-3 shadow-lg inputDate';
    divDateSelector.appendChild(dateCheckOut);

    dateCheckOut.addEventListener('focus', function() {
    this.type = 'date';
    });

    dateCheckOut.addEventListener('blur', function() {
    if (!this.value) {
        this.type = 'text';
    }
    });

    const guestsAmount = document.createElement('select');
    guestsAmount.className = 'card p-3 shadow-lg inputGuests';
    guestsAmount.innerHTML = `
    <option value="">Quantas Pessoas?</option>
    <option value="1">1 pessoa</option>
    <option value="2">2 pessoas</option>
    <option value="3">3 pessoas</option>
    <option value="4">4 pessoas</option>
    <option value="5">5 ou mais pessoas</option>`;
    divDateSelector.appendChild(guestsAmount);

    const btnSearch = document.createElement('button');
    btnSearch.type = 'submit';
    btnSearch.textContent = "Pesquisar";
    btnSearch.className = 'btn btn-primary buttonSearch';
    divDateSelector.appendChild(btnSearch);

    return divDateSelector;
}