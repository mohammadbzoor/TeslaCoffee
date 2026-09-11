import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { auth, data } from "../firebase/firebese";

const AuthContext = createContext(null);

// ✅ إنشاء أو تحديث المستخدم
async function ensureUserDocument(currentUser, fallbackData = {}) {
  const userDocRef = doc(data, "authentact", currentUser.uid);
  const userDoc = await getDoc(userDocRef);

  // ✅ إذا المستخدم موجود
  if (userDoc.exists()) {
    const existingData = userDoc.data();
    const updates = {};

    // ✅ حماية isAdmin (يجب يكون boolean)
    if (typeof existingData.isAdmin !== "boolean") {
      updates.isAdmin = false;
      existingData.isAdmin = false;
    }

    // ✅ IMPORTANT: إجبار أي مستخدم مو أدمن يكون false
    if (existingData.isAdmin !== true) {
      updates.isAdmin = false;
      existingData.isAdmin = false;
    }

    if (Object.keys(updates).length > 0) {
      await setDoc(userDocRef, updates, { merge: true });
    }

    return existingData;
  }

  // ✅ إنشاء مستخدم جديد
  const newUserData = {
    uid: currentUser.uid,
    name:
      fallbackData.name ||
      currentUser.displayName ||
      currentUser.email?.split("@")[0] ||
      "",
    email: currentUser.email || fallbackData.email || "",
    phone: fallbackData.phone || "",
    isAdmin: false, // ✅ المهم
    actions: [],
    createdAt: new Date().toISOString(),
  };

  await setDoc(userDocRef, newUserData);
  return newUserData;
}

// ✅ التحقق من الأدمن (بسيط وواضح)
function checkIsAdmin(userData) {
  return userData.isAdmin === true;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        try {
          const userData = await ensureUserDocument(currentUser);
          setIsAdmin(checkIsAdmin(userData));
        } catch (error) {
          console.error("Error:", error);
          setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // ✅ تسجيل الدخول
  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const user = credential.user;

    await ensureUserDocument(user, { email });

    return user;
  };

  // ✅ إنشاء حساب
  const register = async ({ name, email, password, phone }) => {
    const { user: newUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(newUser, { displayName: name });

    const userDocRef = doc(data, "authentact", newUser.uid);

    await setDoc(userDocRef, {
      uid: newUser.uid,
      name,
      email,
      phone: phone || "",
      isAdmin: false,
      actions: [],
      createdAt: new Date().toISOString(),
    });

    return newUser;
  };

  // ✅ تسجيل الخروج
  const logout = () => signOut(auth);

  // ✅ تسجيل الأحداث
  const logUserAction = async (action) => {
    if (!user) return;

    const userDocRef = doc(data, "authentact", user.uid);

    try {
      await updateDoc(userDocRef, {
        actions: arrayUnion({
          ...action,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error("Error logging action:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loading,
        login,
        register,
        logout,
        logUserAction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// ✅ Hook
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
