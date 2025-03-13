import { useState } from "react";
import Loading from "../components/loading";
import { useAuth } from "../hook/useAuth";
import { useNavigate, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CreateActivityDto } from "../dto/activity/CreateActivityDto";
import { createActivity } from "../api/Activity";
import image from "../assets/Journey-amico.png";

export default function Activity() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { userUid } = useAuth();

  if (!id || !userUid) return <Loading />

  const handleSubmit = async () => {
    setLoading(true);
    if (!name || !startDate || !endDate) {
        setError("All fields are required!");
        return
    };

    const createActivityData: CreateActivityDto = {
        name,
        location,
        startDate,
        endDate,
        cost: budget,
        userUid,
        description,
        tripId: parseInt(id),
    };

    try {
        await createActivity(createActivityData);
        goBack();
    } catch (err) {
        setError("Error! " + err);
    } finally {
        setLoading(false);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (loading) return <Loading />
  
  return (
    <div className="flex flex-row w-full gap-4 px-32 h-full p-4 items-center" style={{ maxHeight: "calc(100vh - 75px)" }}>
        <div className="w-1/2 flex flex-col">
            <span className="text-3xl font-semibold">Ajouter activite</span>
            <form className="mt-8 flex flex-col gap-8" action={handleSubmit}>
                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Nom d'activite <span className="text-red-400">*</span></span>
                    <input
                      required
                      className="p-2 border border-gray-300 rounded-xl w-full"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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
                    <span className="text-gray-400 text-sm">Localisation</span>
                    <input
                      className="p-2 border border-gray-300 rounded-xl w-full"
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                </div>

                <div className="flex gap-8 w-full">
                    <div className="flex flex-col w-1/2">
                        <span className="text-gray-400 text-sm">Start date <span className="text-red-400">*</span></span>
                        <DatePicker
                            required
                            className="p-2 border border-gray-300 rounded-xl w-full"
                            selected={startDate} 
                            onChange={(date: Date | null) => setStartDate(date)}
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>

                    <div className="flex flex-col w-1/2">
                        <span className="text-gray-400 text-sm">End date <span className="text-red-400">*</span></span>
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
                      onChange={(e) => {
                          const value = e.target.value;
                          // Validate and set the budget value
                          if (/^\d*\.?\d{0,2}$/.test(value)) {
                            // Convert the string to a number and set the budget
                            setBudget(value ? parseFloat(value) : null); // Convert string to number or null
                        }
                      }}
                      min="0"
                      step="0.01" // Set to allow 2 decimal points
                  />
              </div>

                <div className="flex flex-col">
                    <span className="text-gray-400 text-sm">Description</span>
                    <textarea
                      className="p-2 border border-gray-300 rounded-xl w-full"
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                {error && (
                    <div className="text-red-600 font-semibold textlg">{error}</div>
                )}

                <div className="flex justify-between">
                  <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl w-fit hover:scale-105 transition ease-in-out">
                      Cree activite
                  </button>

                  <button onClick={goBack} className="text-white bg-black px-4 py-2 rounded-xl cursor-pointer hover:scale-105 transition ease-in-out">Retour</button>
                </div>
            </form>
        </div>
        <div className="w-1/2">
            <img src={image} className="w-full h-full" />
        </div>
    </div>
  );
}