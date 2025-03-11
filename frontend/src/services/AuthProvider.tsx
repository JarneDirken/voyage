import { createContext, useContext } from "react";
import { useAuth } from "../hook/useAuth";

const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
    return useContext(AuthContext);
}