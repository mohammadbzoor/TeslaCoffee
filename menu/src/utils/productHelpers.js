import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { data } from "../firebase/firebese";

function normalizeProductPayload(product) {
  return {
    title: product.title.trim(),
    description: product.description.trim(),
    imgUrl: product.imgUrl.trim(),
    newPrice: Number(product.newPrice),
    oldPrice: product.oldPrice === "" ? "" : Number(product.oldPrice),
    category: product.category,
    section: product.section,
    updatedAt: new Date().toISOString(),
  };
}

export async function updateProduct(productId, product) {
  try {
    await updateDoc(doc(data, "menuItems", productId), normalizeProductPayload(product));
    return { success: true };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, error };
  }
}

export async function deleteProduct(productId) {
  try {
    await deleteDoc(doc(data, "menuItems", productId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, error };
  }
}
