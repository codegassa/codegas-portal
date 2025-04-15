import { User } from "firebase/auth";

// Props para el login
export interface SignInProps {
  email: string;
  password: string;
}
// El siguiente código es opcional.
//export type CreateUserResult = { success: true; user: User } | { success: false; error: string };

// Interfaz principal del contexto
export interface DataProps {
  idUser: string | null;
  acceso: string | null;
  user: User | null;

  login: (credentials: SignInProps) => Promise<void>;
  closeSesion: () => Promise<void>;
  createUserFirebase: (email: string) => Promise<User | string>;
}