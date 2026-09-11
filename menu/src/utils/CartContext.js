import { createContext, useContext, useState, useEffect } from "react";
import { getCart } from "./functionMenu";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  // تحديث العداد عند تحميل الصفحة أو تغيير المستخدم
  useEffect(() => {
    const cart = getCart(user?.uid);
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  }, [user]);

  // دالة لتحديث العداد بعد أي عملية
  const refreshCartCount = () => {
    const cart = getCart(user?.uid);
    setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0));
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
} 