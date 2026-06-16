import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { data } from "../firebase/firebese";

export default function useOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onSnapshot(
      collection(data, "orders"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        // Sort descending by creation date
        list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(list);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Error listening to orders:", err);
        setError(err);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { orders, loading, error };
}
