import { Button, Text } from "@chakra-ui/react"
import useShowToast from "../hooks/useShowToast";
import useLogout from "../hooks/useLogout";

const SettingsPage = () => {
    const showToast = useShowToast()
    const logout = useLogout()

    const freezeAccount = async() => {
      if(!window.confirm('Are you sure you want to freeze your Account?')) return
      try {
        const res = await fetch('/api/users/freeze',{
          method:"PUT",
          headers:{
            "Content-Type":"application/json"
          }
        })
        const data = await res.json()
        if(data.error){
          return showToast("Error",data.error,"error")
        }
        if (data.success){
          await logout()
          showToast("Success","Your Account has been frozen","success")
        }
      } catch (error) {
        howToast("Error",error,"error")
      }
    }
  return (
    <>
    <Text my={1} fontWeight={"bold"} fontSize={25}>Freeze your Account</Text>
    <Text my={1}>You can unfreeze your Account anytime by logging in.</Text>
    <Button
    my={1}
    size={"sm"}
    colorScheme="red"
    onClick={freezeAccount}
    >Freeze</Button>
    </>
  )
}

export default SettingsPage