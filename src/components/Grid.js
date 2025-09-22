export default function Grid() {

    const Grid = document.createElement('div');
    Grid.className = "grid";
    Grid.innerHTML = 
    `
    <table class="table">
        <thead>
            <tr class="table-danger">
            <th scope="col" class="border-right w-50">Categoria do Quarto</th>
            <th scope="col" class="border-right w-25">Quantas pessoas</th>
            <th scope="col" class="border-right w-25">Preço para 4 diarias</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="border-right">
                    <div class="d-flex flex-column">
                        <h6 class="mb-1">Nome do Quarto</h5>
                        <small class="text-muted">Detalhes ou descrição do quarto</small>
                    </div>
                </td>
                <td class="border-right"><i class="bi bi-person-fill"></i></td>
                <td class="border-right text-center">R$ 999,99</td>
            </tr>
            <tr>
                <td class="border-right">
                    <div class="d-flex flex-column">
                        <h6 class="mb-1">Nome do Quarto</h5>
                        <small class="text-muted">Detalhes ou descrição do quarto</small>
                    </div>
                </td>
                <td class="border-right"><i class="bi bi-person-fill"></i></td>
                <td class="border-right text-center">R$ 999,99</td>
            </tr>
            <tr>
                <td class="border-right">
                    <div class="d-flex flex-column">
                        <h6 class="mb-1">Nome do Quarto</h5>
                        <small class="text-muted">Detalhes ou descrição do quarto</small>
                    </div>
                </td>
                <td class="border-right"><i class="bi bi-person-fill"></i></td>
                <td class="border-right text-center">R$ 999,99</td>
            </tr>
            <tr>
                <td></td>
                <td class="text-end border-right"><button type="submit" class="btn btn-primary">Reservar agora</button></td>
                <td class="border-right text-center total" >Total</td>
            </tr>
        </tbody>
    </table>
    `;

    return Grid;
}