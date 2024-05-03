import { useEffect, useState } from "react"
import UserHeader from "../components/UserHeader"
import UserPost from "../components/UserPost"
import { useParams } from "react-router-dom"
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from "@chakra-ui/react";
import Post from "../components/Post"

const UserPage = ()=>{
    const[user,setUser]=useState(null)
    const {username}= useParams()
    const showToast = useShowToast()
    const [loading, setLoading] = useState(true);
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [posts,setPosts] = useState([])

    useEffect(()=>{
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
        const getPosts = async () =>{
            setFetchingPosts(true)
            try {
                const res= await fetch(`/api/posts/user/${username}`)
                const data = await res.json()
                if (data.error){ 
                    showToast("Error",data.error,"error") 
                    return
                }
                setPosts(data)
            } catch (error) {
                showToast("Error",error,"error") 
                setPosts([])
            }   finally {
                setFetchingPosts(false)
            }
        }
        getUser()
        getPosts()
    },[username,showToast])

    if(!user && loading){
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        )
    }
    if(!user && !loading) return <h1>User not found</h1>
    return(
        <>
        <UserHeader user={user}/>
        {!fetchingPosts && posts.length ===0 &&(<h1>User doesnot have any posts.</h1>)}
        {fetchingPosts && (
            <Flex justify={"center"} my={12}>
                <Spinner size={"xl"}></Spinner>
            </Flex>
        )}
        {posts.map((post)  => (
                <Post key={post._id} post={post} postedBy={post.postedBy}></Post>  
            ))}
        </>
    )
}

export default UserPage
