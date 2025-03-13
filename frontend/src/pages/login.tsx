import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setError("An error has accured: " + err);
        }
    };

    return (
        <div className="p-4 flex justify-center items-center w-full" style={{ minHeight: 'calc(100vh - 73.6px)' }}>
            <form action={handleSubmit} className="flex flex-col gap-2 w-1/3">
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Email <span className="text-red-400">*</span></span>
                    <input
                    required
                    className="p-2 border border-gray-300 rounded-xl w-full"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    ref={(input) => {
                        if (input) {
                          input.setCustomValidity(
                            input.validity.valueMissing
                              ? "Ce champ est requis."
                              : ""
                          );
                        }
                      }}
                    />
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Mot de passe <span className="text-red-400">*</span></span>
                    <input
                    required
                    className="p-2 border border-gray-300 rounded-xl w-full"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    ref={(input) => {
                        if (input) {
                          input.setCustomValidity(
                            input.validity.valueMissing
                              ? "Ce champ est requis."
                              : ""
                          );
                        }
                      }}
                    />
                </div>
                <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl hover:scale-105 transition ease-in-out">
                    Login
                </button>
                {error && (
                    <div className="text-red-600 font-semibold textlg">{error}</div>
                )}
            </form>
        </div>
    );
};