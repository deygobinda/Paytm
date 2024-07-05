import { Users } from "../components/Users";
import { Balance } from "../components/Balance";
import { AppBar } from "../components/AppBar";
import { useEffect, useState } from "react";
import axios from "axios";
import { isAuthenticated } from "../store/atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";


export function Dashboard() {

    const [balance, setBalance] = useState(0);
    const setIsAuth = useSetRecoilState(isAuthenticated);
    const navigate = useNavigate();
    const [icon , setIcon] = useState("U")


    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/account/balance", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            .then(response => setBalance(response.data.balance))
    }, [])


    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/verify", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            }
        })
            .then((response) => {
                setIsAuth(true);
                setIcon(response.data.firstName[0].toUpperCase())
                navigate("/dashboard");
            })
            .catch((e) => {
                console.log(e)
                setIsAuth(false);
                navigate("/signin");
            });
    }, [setIsAuth, navigate]);

    return (
        <div>
            <AppBar  icon={icon}/>
            <div className="m-8">
                <Balance value={Math.floor(balance)} />
                <Users />
            </div>

        </div>
    )
}


