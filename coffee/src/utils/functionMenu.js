const CART_KEY_PREFIX = "cart_";

function getCartKey(userId) {
  if (!userId) return null;
  return `${CART_KEY_PREFIX}${userId}`;
}

export function addToCart(product, userId) {
    if (!userId) return false;
    const key = getCartKey(userId);
    let cart = JSON.parse(localStorage.getItem(key)) || [];
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      return false;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem(key, JSON.stringify(cart));
    return true;
}

// جلب السلة
export function getCart(userId) {
  const key = getCartKey(userId);
  if (!key) return [];
  return JSON.parse(localStorage.getItem(key)) || [];
}

// حذف منتج من السلة
export function removeFromCart(id, userId) {
  const key = getCartKey(userId);
  if (!key) return;
  let cart = JSON.parse(localStorage.getItem(key)) || [];
  cart = cart.filter((item) => item.id !== id);
  localStorage.setItem(key, JSON.stringify(cart));
}

// تعديل كمية منتج
export function updateCartQuantity(id, quantity, userId) {
  const key = getCartKey(userId);
  if (!key) return;
  let cart = JSON.parse(localStorage.getItem(key)) || [];
  cart = cart.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  localStorage.setItem(key, JSON.stringify(cart));
}

// مسح السلة الخاصة بالمستخدم
export function clearCart(userId) {
  const key = getCartKey(userId);
  if (!key) return;
  localStorage.removeItem(key);
}

