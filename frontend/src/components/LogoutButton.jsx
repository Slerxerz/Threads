import { Button,useColorModeValue } from "@chakra-ui/react"
import { useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import useShowToast from "../hooks/useShowToast"
import {FiLogOut} from "react-icons/fi"

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()
    const handleLogout = async () => {
       try {
           //fetch request
           const res = await fetch('/api/users/logout',{
               method:"POST",
               headers:{
                   "Content-Type":"application/json"
                }
            })
            const data = await res.json()
            console.log(data)
            if (data.error) {
                showToast("Error",data.error,"error")
                return
            }
            localStorage.removeItem('User-Threads')
            setUser(null)
       } catch (error) {
        showToast("Error",error,"error")
       }
    }

  return (
    <Button
    position={"absolute"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogout} bg={useColorModeValue("gray.300","gray.dark")}>
        <FiLogOut size={20}/>
    </Button>
  )
}

export default LogoutButton