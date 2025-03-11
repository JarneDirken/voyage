import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { auth } from "../services/firebase";

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmit = async () => {
        await signInWithEmailAndPassword(auth, email, password);
    };

    return (
        <form action={handleSubmit}>
            <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Email</span>
                <input
                required
                className="p-2 border border-gray-300 rounded-xl w-full"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col">
                <span className="text-gray-400 text-sm">Email</span>
                <input
                required
                className="p-2 border border-gray-300 rounded-xl w-full"
                type="text"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl w-fit hover:scale-105 transition ease-in-out">
                Login
            </button>
        </form>
    );
};