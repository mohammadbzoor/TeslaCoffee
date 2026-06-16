import { doc, updateDoc, deleteDoc, writeBatch } from "firebase/firestore";
import { data } from "../firebase/firebese";

// تغيير حالة الطلب
export async function toggleOrderStatus(orderId, currentStatus) {
  const newStatus = currentStatus === "جديد" ? "تم الإنجاز" : "جديد";
  try {
    await updateDoc(doc(data, "orders", orderId), { status: newStatus });
    return { success: true };
  } catch (error) {
    console.error("Error updating status in Firestore:", error);
    return { success: false, error };
  }
}

// حفظ الملاحظات الإضافية للطلب
export async function saveOrderNotes(orderId, noteText) {
  try {
    await updateDoc(doc(data, "orders", orderId), { notes: noteText });
    return { success: true };
  } catch (error) {
    console.error("Error saving notes in Firestore:", error);
    return { success: false, error };
  }
}

// حذف طلب فردي
export async function deleteSingleOrder(orderId) {
  try {
    await deleteDoc(doc(data, "orders", orderId));
    return { success: true };
  } catch (error) {
    console.error("Error deleting order from Firestore:", error);
    return { success: false, error };
  }
}

// حذف جميع طلبات يوم معين
export async function deleteDayOrders(orderIds) {
  try {
    const batch = writeBatch(data);
    orderIds.forEach((id) => {
      batch.delete(doc(data, "orders", id));
    });
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error("Error deleting day orders in batch:", error);
    return { success: false, error };
  }
}

// حذف جميع الطلبات بالكامل من النظام
export async function deleteAllOrders(orders) {
  try {
    const batch = writeBatch(data);
    orders.forEach((order) => {
      batch.delete(doc(data, "orders", order.id));
    });
    await batch.commit();
    return { success: true };
  } catch (error) {
    console.error("Error deleting all orders in batch:", error);
    return { success: false, error };
  }
}

// حذف منتج من الطلب وإعادة حساب السعر
export async function deleteProductFromOrder(order, productId) {
  const updatedItems = order.items.filter((item) => item.id !== productId);

  if (updatedItems.length === 0) {
    // إذا فرغ الطلب بالكامل، نحذفه
    try {
      await deleteDoc(doc(data, "orders", order.id));
      return { success: true, deleted: true };
    } catch (error) {
      console.error("Error deleting empty order:", error);
      return { success: false, error };
    }
  } else {
    // إعادة حساب السعر للمتبقي
    const updatedTotal = updatedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    try {
      await updateDoc(doc(data, "orders", order.id), {
        items: updatedItems,
        totalPrice: updatedTotal,
      });
      return {
        success: true,
        deleted: false,
        updatedOrder: {
          ...order,
          items: updatedItems,
          totalPrice: updatedTotal,
        },
      };
    } catch (error) {
      console.error("Error updating order items in Firestore:", error);
      return { success: false, error };
    }
  }
}
