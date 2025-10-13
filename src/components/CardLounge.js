export default function CardLounge(cardLoungeItem, index) {
    const {
        path,
        title,
        text
    } = cardLoungeItem || {}
 
    const CardLounge = document.createElement('div');
    CardLounge.innerHTML =
    `<div class="card" style="width: 18rem; height: 17rem;">
        <img 
            src="public/assets/images/${path}" 
            class="card-img-top" 
            alt="..."
            style="height: 10rem; object-fit: cover;"  
        >
        <div class="btn-group dropup">
            <button type="button" class="btn" data-bs-toggle="dropdown"
                aria-expanded="false" style="border: none;"> 
                
                <img src="public/assets/images/caret-up-fill.svg" style="width: 20px; height: 20px;">
                
                <h3 class="card-text" style="font-size: 1rem; font-weight: 700;">${title}</h3>
            </button>
            
            <ul class="dropdown-menu" style="border-radius: 0.375rem 0.375rem 0 0;">
                
                <p class="card-text" style="color: #495057; font-size: 0.95rem; font-weight: 400; line-height: 1.5; margin: 0; padding: 15px; text-align: justify; background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);">${text}</p>
            </ul>
        </div>
    </div>`
    return CardLounge;
}