import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { data } from "../firebase/firebese";
import { defaultCategories } from "../data/categories";

function getFallbackCategories() {
  return defaultCategories.map((name, index) => ({
    id: name,
    name,
    order: index,
    isDefault: true,
  }));
}

export default function useCategories() {
  const [categories, setCategories] = useState(getFallbackCategories());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  useEffect(() => {
    const categoriesQuery = query(collection(data, "menuCategories"), orderBy("order", "asc"));

    const unsubscribe = onSnapshot(
      categoriesQuery,
      (snapshot) => {
        if (snapshot.empty) {
          setCategories(getFallbackCategories());
        } else {
          setCategories(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              isDefault: false,
              ...doc.data(),
            }))
          );
        }

        setLoading(false);
        setError(null);
        setPermissionDenied(false);
      },
      (err) => {
        console.error("Error listening to categories:", err);
        if (err.code === "permission-denied") {
          setCategories(getFallbackCategories());
          setPermissionDenied(true);
          setError(null);
        } else {
          setError(err);
        }
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  return { categories, loading, error, permissionDenied };
}
