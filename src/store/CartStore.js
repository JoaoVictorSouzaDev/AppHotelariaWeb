const key = "GHR_cart";

export function setCart(GHR_cart) {
  localStorage.setItem(key, JSON.stringify(Array.isArray(GHR_cart) ? GHR_cart: []));
}

export function getCart() {
  try {
    const raw = localStorage.getItem(key);
    const GHR_cart = raw ? JSON.parse(raw) : [];
    return Array.isArray(GHR_cart) ? GHR_cart : [];
  } catch {
    return [];
  }
}

export function addItemToHotel_Cart(item) {
  const GHR_cart = getCart();
  GHR_cart.push(item);
  setCart(GHR_cart);
  return GHR_cart;
}

export function removeItemFromHotel_Cart(i) {
  const GHR_cart = getCart();
  GHR_cart.splice(i, 1);
  setCart(GHR_cart);
  return GHR_cart;
}

export function clearHotel_Cart() {
  setCart({});
}

export function getTotalItems() {
  const items = getCart();
  const total = items.reduce((acc, it) => acc + Number(it.subtotal || 0), 0);
  return { total, qtde_items: items.length };
}
