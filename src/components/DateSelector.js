export default function DateSelector() {

    const divDateSelector = document.createElement('div');
    divDateSelector.className = 'divDateSelector';

    const dateCheckIn = document.createElement('input');
    dateCheckIn.type = 'date'
    dateCheckIn.className = 'card p-4 shadow-lg inputDate';
    divDateSelector.appendChild(dateCheckIn);

    const dateCheckOut = document.createElement('input');
    dateCheckOut.type = 'date'
    dateCheckOut.className = 'card p-4 shadow-lg inputDate';
    divDateSelector.appendChild(dateCheckOut);

    const guestsAmount = document.createElement('select');
    guestsAmount.className = 'card p-4 shadow-lg inputDate';
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
    btnSearch.textContent = "Search";
    btnSearch.className = 'btn btn-primary buttonSearch';
    divDateSelector.appendChild(btnSearch);

    return divDateSelector;
}