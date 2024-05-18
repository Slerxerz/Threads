import { useState } from "react";
import useShowToast from "./useShowToast";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const useFollowUnfollow = (user) => {
	const currentUser = useRecoilValue(userAtom);
	const [following, setFollowing] = useState(user.followers.includes(currentUser?._id));
	const [updating, setUpdating] = useState(false);
	const showtoast = useShowToast();

	const handleFollowUnfollow = async() =>{
        if(!currentUser){
            showtoast("Error","Please login to follow","error")
            return
        }
        if(updating) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/follow/${user._id}`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json()
            if(data.error){
                showtoast("Error",data.error,"error")
                return
            }
            if(following){
                showtoast("Success", `Unfollowed ${user.name}`,"success")
                user.followers.pop() //simulate removing followers, only in the client side
            } else {
                showtoast("Success", `Followed ${user.name}`,"success")
                user.followers.push(currentUser?._id) //simulate adding followers, only in the client side
            }
            setFollowing(!following)
        } catch (error) {
            showtoast("Error",error,"error")
        } finally {
            setUpdating(false)
        }
    }

	return { handleFollowUnfollow, updating, following };
};

export default useFollowUnfollow;