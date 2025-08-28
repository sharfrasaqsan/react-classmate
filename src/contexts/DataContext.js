import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/Config";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [admins, setAdmins] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setLoading(true);
        const res = await getDocs(collection(db, "admins"));
        const resData = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAdmins(resData);
      } catch (err) {
        console.log(
          "Error fetching admins: ",
          err,
          "Error message: ",
          err.message
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setLoading(true);
        const res = await getDocs(collection(db, "teachers"));
        const resData = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTeachers(resData);
      } catch (err) {
        console.log(
          "Error fetching teachers: ",
          err,
          "Error message: ",
          err.message
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await getDocs(collection(db, "students"));
        const resData = res.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStudents(resData);
      } catch (err) {
        console.log(
          "Error fetching students: ",
          err,
          "Error message: ",
          err.message
        );
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  return (
    <DataContext.Provider
      value={{
        admins,
        teachers,
        students,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
