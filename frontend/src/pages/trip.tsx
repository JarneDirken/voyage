import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createTrip } from "../api/Trip";
import { CreateTripDto } from "../dto/trip/CreateTripDto";
import { Link } from "react-router-dom";
import Loading from "../components/loading";
import { useAuth } from "../hook/useAuth";
import { FiUpload, FiDelete } from "react-icons/fi";

export default function Trip() {
    const [name, setName] = useState<string>("");
    const [location, setLocation] = useState<string>("");
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
    const [budget, setBudget] = useState<number | null>(null);
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<string>("");
    const { userUid } = useAuth();
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = async () => {
        setLoading(true);
        if (!name || !location || !startDate || !endDate || !userUid) {
            setError("All fields are required!");
            return
        }

        const createTripData: CreateTripDto = {
            name,
            location,
            startDate,
            endDate,
            budget,
            userUid,
            image: file
        };

        try { 
            await createTrip(createTripData);
            setSuccess("Voyage est cree! Regardez tout vos voyages");
        } catch (err) {
            setError("Error! " + err)
        } finally {
            setLoading(false);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
  };

  const handleDrop = async (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
        setFile(event.target.files[0]);
    }
  };

  const handleClearFile = async () => {
    if (file) {
        try {
            setFile(null);
            // Reset the file input value if necessary
            const fileInput = document.getElementById('file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
  };

    if (loading) return <Loading />

    return(
        <div className="flex flex-row w-full gap-4 px-32 h-full p-4">
            <div className="w-1/2 flex flex-col">
                <span className="text-4xl font-semibold">Ou voulez-vous aller?</span>
                <span className="text-gray-400 mt-6">Planifiez votre prochain voyage de rêve!</span>
                <form className="mt-8 flex flex-col gap-8" action={handleSubmit}>
                    <div className="flex flex-col">
                        <span className="text-gray-400 text-sm">Nom de voyage <span className="text-red-400">*</span></span>
                        <input
                        required
                        className="p-2 border border-gray-300 rounded-xl w-full"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-gray-400 text-sm">Localisation <span className="text-red-400">*</span></span>
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
                            onChange={(e) => setBudget(e.target.value ? parseInt(e.target.value) : null)}
                            min="0"
                            step="1"
                            pattern="\d"
                        />
                    </div>
                    <div className="flex flex-col justify-center items-center mt-2">
                    <label
                        htmlFor="file-upload"
                        className="cursor-pointer border-dashed border border-gray-400 bg-gray-100 w-full rounded py-8 px-8 text-center flex items-center justify-center flex-col"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <FiUpload fontSize='large' className="text-gray-400"/>
                        <div className="flex flex-col">
                            <span className="font-semibold"><span className="text-blue-400">Cliquez pour télécharger</span> ou par glisser-déposer</span>
                            <span className="text-custom-gray">JPG, JPEG, PNG, moins de 5MB.</span>
                        </div>
                        <input
                        id="file-upload"
                        type="file"
                        onChange={handleFileChange}
                        className="opacity-0 w-0 h-0"
                        accept="image/jpeg,image/png,image/jpg"
                        />
                    </label>
                    {file && (
                        <div className="flex flex-row gap-2 items-center mt-2">
                            <span>File selected: {file.name}</span>
                            <FiDelete className="cursor-pointer" onClick={handleClearFile} />
                        </div>
                    )}
                    </div>

                    {error && (
                        <div className="text-red-600 font-semibold textlg">{error}</div>
                    )}

                    <button className="p-4 border border-green-400 bg-green-200 cursor-pointer rounded-xl w-fit hover:scale-105 transition ease-in-out">
                        Cree voyage
                    </button>

                    {success && (
                    <div className="text-green-600 font-semibold text-lg">{success} <Link to="/trips" className="underline font-extrabold">la</Link></div>
                    )}
                </form>
            </div>
            <div className="w-1/2">
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d41725.38331246649!2d-0.4134420330651451!3d49.18468987440681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x480a42bd4c04c933%3A0x3da5749f30d00859!2s14000%20Caen!5e0!3m2!1sen!2sfr!4v1740993151353!5m2!1sen!2sfr" 
                className="w-full h-full" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    );
}