
export default function DateSelector() {

    const divDateSelector = document.createElement('div');
    divDateSelector.className = 'divDateSelector';

    const divCheckInWithMsgError = document.createElement('div');
    divCheckInWithMsgError.className = 'divCheckInWithMsgError';

    //Check-In
    const dateCheckIn = document.createElement('input');
    dateCheckIn.type = 'text'
    dateCheckIn.placeholder = 'Check-In'
    dateCheckIn.className = 'card p-3 shadow-lg js-check-in-input';
    divCheckInWithMsgError.appendChild(dateCheckIn);

    const erroCheckIn = document.createElement('span');
    erroCheckIn.className = 'js-erro-checkin'
    divCheckInWithMsgError.appendChild(erroCheckIn);

    dateCheckIn.addEventListener('focus', function() {
    this.type = 'date';
    });

    dateCheckIn.addEventListener('blur', function() {
    if (!this.value) {
        this.type = 'text';
    }
    });


    divDateSelector.appendChild(divCheckInWithMsgError);
    //Check-Out
    const dateCheckOut = document.createElement('input');
    dateCheckOut.type = 'text'
    dateCheckOut.placeholder = 'Check-Out'
    dateCheckOut.className = 'card p-3 shadow-lg js-check-out-input';
    divDateSelector.appendChild(dateCheckOut);

    const erroCheckOut = document.createElement('span');
    erroCheckOut.className = 'js-erro-checkout'
    divDateSelector.appendChild(erroCheckOut);

    dateCheckOut.addEventListener('focus', function() {
    this.type = 'date';
    });

    dateCheckOut.addEventListener('blur', function() {
    if (!this.value) {
        this.type = 'text';
    }
    });

    //Guests Amount
    const guestsAmount = document.createElement('select');
    guestsAmount.className = 'card p-3 shadow-lg inputGuests js-guests-amount';
    guestsAmount.innerHTML = `
    <option value="">Quantas Pessoas?</option>
    <option value="1">1 pessoa</option>
    <option value="2">2 pessoas</option>
    <option value="3">3 pessoas</option>
    <option value="4">4 pessoas</option>
    <option value="5">5 ou mais pessoas</option>`;
    divDateSelector.appendChild(guestsAmount);

    const erroGuestsAmount = document.createElement('span');
    erroGuestsAmount.className = 'js-erro-guests-amount'
    divDateSelector.appendChild(erroGuestsAmount);

    //Botão Pesquisar
    const btnSearch = document.createElement('button');
    btnSearch.type = 'submit';
    btnSearch.textContent = "Pesquisar";
    btnSearch.className = 'btn btn-primary buttonSearch js-search-button';
    divDateSelector.appendChild(btnSearch);

    return divDateSelector;

};