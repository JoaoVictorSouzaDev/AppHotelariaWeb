export default function CarouselCard() {
    const divCarousel = document.createElement('div');

    divCarousel.innerHTML =
    `
    <div class="hero-frame rounded-4 w-100">
        <div id="carouselCardIndicators" class="carousel slide">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselCardIndicators" data-bs-slide-to="0" class="active"
                    aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselCardIndicators" data-bs-slide-to="1"
                    aria-label="Slide 2"></button>
                </div>

            <div class="carousel-inner shadow">
            
                <div class="carousel-item active">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card">
                                <img src="public/assets/images/FotoCard1.jpeg" class="card-img-top" alt="Card 1">
                                <div class="card-body">
                                    <h5 class="card-title">Título do Card 1</h5>
                                    <p class="card-text">Descrição do Card 1.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card">
                                <img src="public/assets/images/FotoCard1.jpeg" class="card-img-top" alt="Card 2">
                                <div class="card-body">
                                    <h5 class="card-title">Título do Card 2</h5>
                                    <p class="card-text">Descrição do Card 2.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card">
                                <img src="public/assets/images/FotoCard1.jpeg" class="card-img-top" alt="Card 3">
                                <div class="card-body">
                                    <h5 class="card-title">Título do Card 3</h5>
                                    <p class="card-text">Descrição do Card 3.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="carousel-item">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="card">
                                <img src="public/assets/images/FotoCard1.jpeg" class="card-img-top" alt="Card 4">
                                <div class="card-body">
                                    <h5 class="card-title">Título do Card 4</h5>
                                    <p class="card-text">Descrição do Card 4.</p>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card">
                                <img src="public/assets/images/FotoCard1.jpeg" class="card-img-top" alt="Card 5">
                                <div class="card-body">
                                    <h5 class="card-title">Título do Card 5</h5>
                                    <p class="card-text">Descrição do Card 5.</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="card">
                                <img src="public/assets/images/FotoCard1.jpeg" class="card-img-top" alt="Card 6">
                                <div class="card-body">
                                    <h5 class="card-title">Título do Card 6</h5>
                                    <p class="card-text">Descrição do Card 6.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                </div>

            <button class="carousel-control-prev" type="button" data-bs-target="#carouselCardIndicators"
                data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselCardIndicators"
                data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>
    `

    return divCarousel;
}