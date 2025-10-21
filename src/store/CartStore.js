const key = "GHR_cart";

export function setCart(cart) {
    localStorage.setItem(key, JSON.stringify(cart));
}

export function getCart() {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : { status: "draft", itens: []}; 
    } catch {
        return {status : "draft", itens: []};
    }
}

export function addItemCart(item) {
    const cart = getCart();
    cart.items.push(item);
    setCart(cart);
    return cart;
}

export function removeItemFromHotel_Cart(i) {
    const hotel_cart = getCart();
    hotel_cart.items.splice(i, 1);
    setCart(hotel_cart);
    return hotel_cart;
}
 
export function clearHoteml_Cart() {
    setCart(
        {
            status: "draft",
            items: []
        }
    )
 
};
 
export function getTotalItems() {
    const {items} = getCart();
    const total = items.reduce((acc, it) =>
    acc + Number(it.subtotal || 0), 0
    );
    return {
        total,
        qtde_items: items.length
    };
 
}