'use client'
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { getUserByUid } from "../store/fetch-user";
import { auth } from "../utils/firebase/firebase-config";
import {SignInProps, DataProps} from "./types"
 
const DataContext = createContext<DataProps>({
  idUser: null,
  acceso: null,
  user: null,
  login: async () => {},
  closeSesion: async () => {},
  createUserFirebase: async () => {
    throw new Error("createUserFirebase not implemented");
  },
});

const getFromLocalStorage = (key: string) => {
  if (typeof window === "undefined") return null;
  const item = localStorage.getItem(key);
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return item;
  }
};

const setToLocalStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  }
};

const removeFromLocalStorage = (keys: string[]) => {
  if (typeof window !== "undefined") {
    keys.forEach((key) => localStorage.removeItem(key));
  }
};

const DataProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUser] = useState<User | null>(null);
  const [idUser, setIdUser] = useState<string | null>(null);
  const [acceso, setAcceso] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getFromLocalStorage("user");
    const storedIdUser = getFromLocalStorage("idUser");
    const storedAcceso = getFromLocalStorage("acceso");

    if (storedUser) setUser(storedUser);
    if (storedIdUser) setIdUser(storedIdUser);
    if (storedAcceso) setAcceso(storedAcceso);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setIdUser(null);
        setAcceso(null);
      }
    });

    setLoading(false);
    return () => unsubscribe();
  }, []);

  const login = async ({ email, password }: SignInProps) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      const { _id, acceso } = await getUserByUid(user.uid);

      setToLocalStorage("user", user);
      setToLocalStorage("idUser", _id);
      setToLocalStorage("acceso", acceso);

      setUser(user);
      setIdUser(_id);
      setAcceso(acceso);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const closeSesion = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIdUser(null);
      setAcceso(null);
      removeFromLocalStorage(["user", "idUser", "acceso"]);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  const createUserFirebase = async (email: string) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, "aef*/aef");
      return user;
    } catch (error: any) {
      return error?.code || "unknown error";
    }
  };

  const data: DataProps = {
    user: userData,
    idUser,
    acceso,
    login,
    closeSesion,
    createUserFirebase,
  };

  // Mostrar loading (evita error de hidratación)
  if (loading) return null;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export { DataContext, DataProvider };