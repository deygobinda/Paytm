import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { Signin } from "./pages/Signin";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/Dashboard";
import { SendMoney } from "./pages/SendMoney";
import { RecoilRoot, useRecoilState } from "recoil";
import { isAuthenticated } from "./store/atoms";


function AppWrapper() {
  const isAuth= useRecoilState(isAuthenticated);
  const navigate = useNavigate();

 

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={isAuth ? <Dashboard /> : navigate("/signin")} />
        <Route path="/send" element={<SendMoney />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <AppWrapper />
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
