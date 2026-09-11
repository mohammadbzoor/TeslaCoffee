import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { data } from "../firebase/firebese";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);

    const unsubscribe = onSnapshot(
      collection(data, "menuItems"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        list.sort((a, b) => {
          const firstDate = new Date(a.createdAt || 0);
          const secondDate = new Date(b.createdAt || 0);
          return secondDate - firstDate;
        });

        setProducts(list);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error listening to products:", err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { products, loading, error };
}
