import { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { arrayUnion, doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { auth, data } from "../firebase/firebese";

const AuthContext = createContext(null);

async function ensureUserDocument(currentUser, fallbackData = {}) {
  const userDocRef = doc(data, "authentact", currentUser.uid);
  const userDoc = await getDoc(userDocRef);

  if (userDoc.exists()) {
    return userDoc.data();
  }

  const newUserData = {
    uid: currentUser.uid,
    name:
      fallbackData.name ||
      currentUser.displayName ||
      currentUser.email?.split("@")[0] ||
      "",
    email: currentUser.email || fallbackData.email || "",
    phone: fallbackData.phone || "",
    isAdmin: true,
    actions: [],
    createdAt: new Date().toISOString(),
  };

  await setDoc(userDocRef, newUserData);
  return newUserData;
}

function checkIsAdmin(userData) {
  return (
    userData.role === "admin" ||
    userData.role === "isAdmin" ||
    userData.isAdmin === true ||
    String(userData.isAdmin).toLowerCase() === "true" ||
    userData.isAdmain === true ||
    String(userData.isAdmain).toLowerCase() === "true"
  );
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
          console.log("User data fetched:", userData);
          setIsAdmin(checkIsAdmin(userData));
        } catch (error) {
          console.error("Error fetching user role:", error);
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

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    const loggedInUser = credential.user;
    await ensureUserDocument(loggedInUser, { email });
    return loggedInUser;
  };

  const register = async ({ name, email, password, phone }) => {
    const { user: newUser } = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(newUser, { displayName: name });

    await ensureUserDocument(newUser, { name, email, phone });

    return newUser;
  };

  const logout = () => signOut(auth);

  const logUserAction = async (action) => {
    if (!user) return { success: false, reason: "no-user" };

    try {
      await ensureUserDocument(user);
      await updateDoc(doc(data, "authentact", user.uid), {
        actions: arrayUnion({
          id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          createdAt: new Date().toISOString(),
          ...action,
        }),
      });

      return { success: true };
    } catch (error) {
      console.error("Error logging user action:", error);
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, register, logout, logUserAction }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
