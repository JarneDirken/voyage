import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTrip } from "../api/Trip";
import { CreateTripDto } from "../dto/trip/CreateTripDto";

export default function Trip() {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [budget, setBudget] = useState<number | null>(null);
    const [error, setError] = useState<string>("");

    const handleSubmit = async () => {
        console.log("submit");
        if (!name || !location || !startDate || !endDate) setError("All fields are required!");

        const createTripData: CreateTripDto = {
            name,
            location,
            startDate,
            endDate,
            budget,
            userId: 1
        }

        const response = await createTrip(createTripData);
        console.log(response);
    };

    return(
        <div className="flex flex-col w-full gap-4 px-32 h-full">
            <span className="text-4xl font-semibold">Ou voulez-vous aller?</span>
            <span className="text-gray-400 mt-6">Planifiez votre prochain voyage de rêve!</span>
            <form className="mt-8 flex flex-col gap-8" action={handleSubmit}>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Nom de voyage</span>
                    <input
                    required
                    className="p-2 border border-gray-300 rounded-xl w-full"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Localisation</span>
                    <input
                    required
                    className="p-2 border border-gray-300 rounded-xl w-full"
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="flex gap-8 w-full">
                    <div className="flex flex-col w-1/2">
                        <span className="text-gray-400 text-sm">Start date</span>
                        <DatePicker
                            required
                            className="p-2 border border-gray-300 rounded-xl w-full"
                            selected={startDate} 
                            onChange={(date: Date | null) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className="flex flex-col w-1/2">
                        <span className="text-gray-400 text-sm">End date</span>
                        <DatePicker
                            required
                            className="p-2 border border-gray-300 rounded-xl w-full"
                            selected={endDate} 
                            onChange={(date: Date | null) => setEndDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Budget</span>
                    <input 
                        className="p-2 border border-gray-300 rounded-xl w-full"
                        type="number"
                        value={budget || ""}
                        onChange={(e) => setBudget(e.target.value ? parseInt(e.target.value) : null)}
                        min="0"
                        step="1"
                        pattern="\d"
                    />
                </div>

                {error && (
                    <div className="text-red-600 font-semibold textlg">{error}</div>
                )}

                <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl w-fit hover:scale-105 transition ease-in-out">
                    Cree voyage
                </button>
            </form>
        </div>
    );
}