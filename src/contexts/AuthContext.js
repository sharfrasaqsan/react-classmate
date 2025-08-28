import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/Config";
import { getDoc, doc } from "firebase/firestore";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          let res = await getDoc(doc(db, "admins", user.uid)); // try to get admin
          if (res.exists()) {
            setUser({ id: res.id, role: "admin", ...res.data() });
          } else {
            res = await getDoc(doc(db, "teachers", user.uid)); // try to get teacher
            if (res.exists()) {
              setUser({ id: res.id, role: "teacher", ...res.data() });
            } else {
              res = await getDoc(doc(db, "students", user.uid)); // try to get student
              if (res.exists()) {
                setUser({ id: res.id, role: "student", ...res.data() });
              } else {
                setUser(null); // not found in any collection
              }
            }
          }
        } catch (err) {
          setUser(null);
          console.log("Error fetching user data: ", err);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
