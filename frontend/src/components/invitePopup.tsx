import { Dispatch, SetStateAction, useState } from "react";
import { inviteUser } from "../api/Trip";

interface InvitePopupProps {
    setRefreshTrigger: (Dispatch<SetStateAction<number>>);
    onClose: (Dispatch<SetStateAction<boolean>>);
    id: string;
}

export default function InvitePopup({ setRefreshTrigger, onClose, id } : InvitePopupProps) {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const inviteSomebody = async () => {
        try {
            await inviteUser(parseInt(id), email);
            setRefreshTrigger(prev => prev += 1);
            onClose(false);
        } catch(err) {
            setError("Error: " + err)
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        inviteSomebody();
      };

    return (
        <div className="flex flex-col w-full h-full  justify-center items-center gap-2">
            <h1 className="text-3xl">Qui voulez-vous inviter?</h1>
            <form className="w-1/2 flex gap-2 flex-col" onSubmit={handleSubmit}>
                <span className="text-gray-400 text-sm">Email </span>
                <input
                required
                className="p-2 border border-gray-300 rounded-xl w-full"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
               <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl w-fit hover:scale-105 transition ease-in-out">
                    Invite
                </button>
                {error && (
                    <div className="text-red-600 font-semibold textlg">{error}</div>
                )}
            </form>
        </div>
    );
}