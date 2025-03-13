import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { CreateUserDto } from "../dto/user/CreateUserDTo";
import { useNavigate } from "react-router-dom";
import { createAccount } from "../api/User";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const dto: CreateUserDto = {
      firstName,
      lastName,
      email,
      password
    };

    try {
      await createAccount(dto);
    
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (err) {
      setError("An error has accured: " + err);
    }
  };

  return (
    <div className="flex flex-row w-full justify-center items-center" style={{ minHeight: 'calc(100vh - 73.6px)' }}>
      <form className="w-1/2 flex flex-col gap-4" action={handleSubmit}>
        <div className="flex flex-row w-full gap-8">
          <div className="flex flex-col w-1/2">
            <span className="text-gray-400 text-sm">Prenom <span className="text-red-400">*</span></span>
            <input
              required
              className="p-2 border border-gray-300 rounded-xl w-full"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
          <div className="flex flex-col w-1/2">
            <span className="text-gray-400 text-sm">Nom <span className="text-red-400">*</span></span>
            <input
              required
              className="p-2 border border-gray-300 rounded-xl w-full"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
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
        </div>
        <div className="flex flex-row w-full gap-8">
          <div className="flex flex-col w-1/2">
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
                      : input.validity.typeMismatch
                      ? "Veuillez entrer une adresse email valide."
                      : ""
                  );
                }
              }}
            />
          </div>
          <div className="flex flex-col w-1/2">
            <span className="text-gray-400 text-sm">Mot de passe <span className="text-red-400">*</span></span>
            <input
              required
              minLength={6}
              className="p-2 border border-gray-300 rounded-xl w-full"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              ref={(input) => {
                if (input) {
                  input.setCustomValidity(
                    input.validity.valueMissing
                      ? "Ce champ est requis."
                      : input.validity.tooShort
                      ? "Le mot de passe doit contenir au moins 6 caractères."
                      : ""
                  );
                }
              }}
            />
          </div>
        </div>
        <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl hover:scale-105 transition ease-in-out">S'inscrire</button>
        {error && (
            <div className="text-red-600 font-semibold textlg">{error}</div>
        )}
      </form>
    </div>
  );
}