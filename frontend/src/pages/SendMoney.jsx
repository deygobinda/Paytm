import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export const SendMoney = () => {
    const [amount, setAmount] = useState(0);
    const { search } = useLocation();
    const query = new URLSearchParams(search);
    const to = query.get('id');
    const namae = query.get('name');
    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                navigate("/dashboard");
                setSuccess(false);
            }, 1500);
        }
    }, [success, navigate]);

    async function handleTransfer() {
        try {
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to,
                amount
            }, {
                headers: {
                    "authorization": "Bearer " + localStorage.getItem("token")
                }
            });

            if (res.status === 200) {
                setSuccess(true);
                setError("");
            } else {
                setSuccess(false);
                setError("Transfer failed. Please try again.");
            }
        } catch (err) {
            setSuccess(false);
            setError(err.response?.data?.message || "An error occurred. Please try again.");
        }
    }

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Send Money</h2>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                                <span className="text-2xl text-white">{namae[0].toUpperCase()}</span>
                            </div>
                            <h3 className="text-2xl font-semibold">{namae}</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    htmlFor="amount"
                                >
                                    Amount (in Rs)
                                </label>
                                <input
                                    type="number"
                                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                                    id="amount"
                                    placeholder="Enter amount"
                                    onChange={e => {
                                        setAmount(parseInt(e.target.value));
                                    }}
                                />
                            </div>
                            <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white" onClick={handleTransfer}>
                                Initiate Transfer
                            </button>
                            <div className="min-h-10">
                                {success && (
                                    <div className="text-green-500 text-center">
                                        Transfer successful!
                                    </div>
                                )}
                                {error && (
                                    <div className="mt-4 text-red-500 text-center">
                                        {error}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
