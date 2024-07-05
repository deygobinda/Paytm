import { useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useSetRecoilState } from "recoil"
import { useNavigate } from "react-router-dom"
import { isAuthenticated } from "../store/atoms"

export const Signin = () => {

  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const setAtuh = useSetRecoilState(isAuthenticated)
  const navigaet = useNavigate()

  async function handleClick() {
    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
      userName: userName,
      password: password
    })
    setAtuh(true)
    localStorage.setItem("token", response.data.token)
    navigaet("/dashboard")
  }


  return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
        <InputBox placeholder="deygobinda@gmail.com" label={"Email"} onChange={e => {
          setUserName(e.target.value)
        }} />
        <InputBox placeholder="123456" label={"Password"} onChange={e => {
          setPassword(e.target.value)
        }} />
        <div className="pt-4">
          <Button label={"Sign in"} onClick={handleClick} />
        </div>
        <BottomWarning label={"Don't have an accout?"} buttonText={"Sign up"} to={"/signup"} />
      </div>
    </div>
  </div>
}