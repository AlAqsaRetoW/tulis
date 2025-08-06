import { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase'

export const AuthContext = createContext({
  user: null,
  name: null,
  role: null,
  loading: false,
});

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //get user from users collection by uid
        const getUserData = async () => {
          try {
            const userCredential = await getDoc(doc(db, 'users', user.uid));
            setUser(user);
            setName(userCredential.data().name);
            setRole(userCredential.data().role);
          } catch (err) {
            console.error(err)
          }
        };
        getUserData();
      } else {
        setUser(null);
        setName(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const value = { user, loading, name, role };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
