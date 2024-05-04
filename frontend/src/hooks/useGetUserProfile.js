import {useEffect, useState} from 'react'
import useShowToast from "../hooks/useShowToast";
import { useParams } from 'react-router-dom';

const useGetUserProfile = () => {
    const showToast = useShowToast()
    const [loading, setLoading] = useState(true);
    const [user,setUser]= useState(null)
    const {username}=useParams()

    useEffect(() => {
        const getUser = async () =>{
            try {
                const res= await fetch(`/api/users/profile/${username}`)
                const data = await res.json()
                if (data.error){ 
                    showToast("Error",data.error,"error") 
                    return
                }
                setUser(data)
            } catch (error) {
                showToast("Error",error,"error") 
            }   finally {
                setLoading(false)
            }
        }
        getUser()
    },[username,showToast])
    return {loading,user}
}

export default useGetUserProfile