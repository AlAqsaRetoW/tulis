import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { AuthContext } from "./AuthContext";

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        const fetchUserData = async () => {
          try {
            const userDoc = await getDoc(doc(db, "users", authUser.uid));
            setUser(authUser);
            const data = userDoc.data();
            setName(data?.name ?? null);
            setRole(data?.role ?? null);
          } catch (err) {
            console.error(err);
          } finally {
            setLoading(false);
          }
        };
        fetchUserData();
      } else {
        setUser(null);
        setName(null);
        setRole(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading, name, role };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
