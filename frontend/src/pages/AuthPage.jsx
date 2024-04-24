import SignupCard from "../components/SignUpCard"
import LoginCard from "../components/LoginCard"
import authScreenAtom from "../atoms/authAtom"
import { useRecoilValue, useSetRecoilState } from "recoil"

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom)
    console.log(authScreenState)
  return (
    <>
        {authScreenState==="login" ?<LoginCard/>:<SignupCard/>}
    </>
  )
}

export default AuthPage