import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, getDoc, doc } from "firebase/auth";
import { auth } from "../firebase";
import { db } from "../firebase/Config";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const res = await getDoc(doc(db, "users", user.uid));
          if (user.exist()) {
            setUser({ id: res.id, ...res.data() });
          } else {
            setUser(null);
          }
        } catch (err) {
          setUser(null);
          console.log(err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  });

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
