export function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      // المنتج موجود بالفعل، لا تضف أو زد الكمية
      return false;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    return true;
}
// جلب السلة
export function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

// حذف منتج من السلة
export function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
}

// تعديل كمية منتج
export function updateCartQuantity(id, quantity) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  localStorage.setItem("cart", JSON.stringify(cart));
}

