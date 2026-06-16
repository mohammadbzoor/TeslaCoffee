import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { data } from "../firebase/firebese";

const authErrorMessages = {
  "auth/email-already-in-use": "البريد الإلكتروني مستخدم بالفعل",
  "auth/invalid-email": "البريد الإلكتروني غير صالح",
  "auth/weak-password": "كلمة المرور ضعيفة، يجب أن تكون 6 أحرف على الأقل",
  "auth/user-not-found": "لا يوجد حساب بهذا البريد الإلكتروني",
  "auth/wrong-password": "كلمة المرور غير صحيحة",
  "auth/invalid-credential": "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  "auth/too-many-requests": "محاولات كثيرة، حاول لاحقاً",
};

export function getAuthErrorMessage(code) {
  return authErrorMessages[code] || "حدث خطأ، يرجى المحاولة مرة أخرى";
}

// دالة لإضافة صنف جديد إلى Firestore
export async function addMenuItem(item) {
  try {
    const docRef = await addDoc(collection(data, "menuItems"), item);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("خطأ أثناء الإضافة إلى Firestore:", error);
    return { success: false, error };
  }
}

// دالة للحصول على جميع الأصناف من Firestore في الوقت الفعلي
export function getMenuItemsRealtime(callback) {
  try {
    const unsubscribe = onSnapshot(collection(data, "menuItems"), (querySnapshot) => {
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log("البيانات القادمة من فايربيز:", items);
      callback({ success: true, data: items });
    }, (error) => {
      console.error("خطأ أثناء جلب البيانات من Firestore:", error);
      callback({ success: false, error });
    });
    
    return unsubscribe; // لإلغاء الاشتراك لاحقاً
  } catch (error) {
    console.error("خطأ في إعداد onSnapshot:", error);
    callback({ success: false, error });
  }
}

// دالة لإرسال البيانات (مثل addMenuItem ولكن باسم مختلف)
export async function sendMenuItem(item) {
  try {
    const docRef = await addDoc(collection(data, "menuItems"), {
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("خطأ أثناء إرسال البيانات إلى Firestore:", error);
    return { success: false, error };
  }
}