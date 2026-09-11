import { addDoc, collection, deleteDoc, doc, getDocs, updateDoc, writeBatch } from "firebase/firestore";
import { data } from "../firebase/firebese";
import { defaultCategories } from "../data/categories";

const categoriesCollection = collection(data, "menuCategories");

export async function seedDefaultCategories() {
  try {
    const snapshot = await getDocs(categoriesCollection);
    if (!snapshot.empty) return { success: true, seeded: false };

    const batch = writeBatch(data);
    defaultCategories.forEach((name, index) => {
      const categoryRef = doc(categoriesCollection);
      batch.set(categoryRef, {
        name,
        order: index,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    });

    await batch.commit();
    return { success: true, seeded: true };
  } catch (error) {
    console.error("Error seeding categories:", error);
    return { success: false, error };
  }
}

export async function addCategory(name, order) {
  try {
    await addDoc(categoriesCollection, {
      name: name.trim(),
      order,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error adding category:", error);
    return { success: false, error };
  }
}

export async function updateCategory(categoryId, name) {
  try {
    await updateDoc(doc(data, "menuCategories", categoryId), {
      name: name.trim(),
      updatedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (error) {
    console.error("Error updating category:", error);
    return { success: false, error };
  }
}

export async function deleteCategory(categoryId) {
  try {
    await deleteDoc(doc(data, "menuCategories", categoryId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting category:", error);
    return { success: false, error };
  }
}
