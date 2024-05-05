import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from "../hooks/useShowToast"


const useLogout = () => {
    const showToast = useShowToast()
    const setUser = useSetRecoilState(userAtom) 

    const logout = async () => {
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
     return logout
}

export default useLogout