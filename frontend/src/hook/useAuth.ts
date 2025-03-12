import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../services/firebase";

export function useAuth(){
    const [firebaseToken, setFirebaseToken] = useState<string | null>(localStorage.getItem("token"));
    const [userUid, setUserUid] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken(true);
                setFirebaseToken(token);
                setUserUid(user.uid);
                localStorage.setItem("token", token);
            } else {
                setFirebaseToken(null);
                setUserUid(null);
                localStorage.removeItem("token");
            }
        });

        return () => unsubscribe();
    }, []);

    // if firebasetoken = null, undefined, 0, "", false -> false
    // if firebaseToken = [ojbect], "token", 1, true -> true
    const isAuthenticated = () => !!firebaseToken;

    const logout = async () => {
        await signOut(auth);
        localStorage.removeItem("token");
        setFirebaseToken(null);
        setUserUid(null);
    };

    return { isAuthenticated, logout, userUid }
};