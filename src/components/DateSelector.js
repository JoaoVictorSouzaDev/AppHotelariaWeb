
export default function DateSelector() {

    function getTodayDateISO() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); 
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const todayISO = getTodayDateISO();

    const divDateSelector = document.createElement('div');
    divDateSelector.className = 'divDateSelector';

    const divCheckInWithMsgError = document.createElement('div');
    divCheckInWithMsgError.className = 'divCheckInWithMsgError';

    //Check-In
    const dateCheckIn = document.createElement('input');
    dateCheckIn.type = 'text'
    dateCheckIn.id = 'Check-In'
    dateCheckIn.placeholder = 'Check-In'
    dateCheckIn.className = 'card p-3 shadow-lg js-check-in-input';
    dateCheckIn.min = todayISO; 

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

    const divCheckOutWithMsgError = document.createElement('div');
    divCheckOutWithMsgError.className = 'divCheckInWithMsgError';

    const dateCheckOut = document.createElement('input');
    dateCheckOut.type = 'text'
    dateCheckOut.id = 'Check-Out'
    dateCheckOut.placeholder = 'Check-Out'
    dateCheckOut.className = 'card p-3 shadow-lg js-check-out-input';
    dateCheckOut.min = todayISO;

    divCheckOutWithMsgError.appendChild(dateCheckOut);

    const erroCheckOut = document.createElement('span');
    erroCheckOut.className = 'js-erro-checkout'
    divCheckOutWithMsgError.appendChild(erroCheckOut);

    dateCheckOut.addEventListener('focus', function() {
    this.type = 'date';
    });

    dateCheckOut.addEventListener('blur', function() {
    if (!this.value) {
        this.type = 'text';
    }
    });

    dateCheckIn.addEventListener('change', function() {
        const checkInDate = new Date(this.value);
        checkInDate.setDate(checkInDate.getDate() + 1);
        const minCheckOut = `${checkInDate.getFullYear()}-${String(checkInDate.getMonth() + 1).padStart(2, '0')}-${String(checkInDate.getDate()).padStart(2, '0')}`;
        dateCheckOut.min = minCheckOut;
        if (dateCheckOut.value && dateCheckOut.value < minCheckOut) {
            dateCheckOut.value = minCheckOut;
        }
    });

    divDateSelector.appendChild(divCheckOutWithMsgError);

    //Guests Amount
    const divGuestsAmountWithMsgError = document.createElement('div');
    divGuestsAmountWithMsgError.className = 'divCheckInWithMsgError';

    const guestsAmount = document.createElement('select');
    guestsAmount.id = 'id-guestAmount';
    guestsAmount.className = 'card p-3 shadow-lg inputGuests js-guests-amount';
    guestsAmount.innerHTML = `
    <option value="">Quantas Pessoas?</option>
    <option value="1">1 pessoa</option>
    <option value="2">2 pessoas</option>
    <option value="3">3 pessoas</option>
    <option value="4">4 pessoas</option>
    <option value="5">5 ou mais pessoas</option>`;
    divGuestsAmountWithMsgError.appendChild(guestsAmount);

    const erroGuestsAmount = document.createElement('span');
    erroGuestsAmount.className = 'js-erro-guests-amount'
    divGuestsAmountWithMsgError.appendChild(erroGuestsAmount);

    divDateSelector.appendChild(divGuestsAmountWithMsgError);

    //Botão Pesquisar
    const btnSearch = document.createElement('button');
    btnSearch.type = 'submit';
    btnSearch.textContent = "Pesquisar";
    btnSearch.className = 'btn btn-primary buttonSearch js-search-button';
    divDateSelector.appendChild(btnSearch);

    return divDateSelector;

};