import { Flex, Spinner } from "@chakra-ui/react"
import { useEffect } from "react"
import useShowToast from "../hooks/useShowToast"
import { useState } from "react"
import Post from "../components/Post"
import { useRecoilState } from "recoil"
import postsAtom from "../atoms/postsAtom"

const HomePage= () => {
    const [posts,setPosts ]= useRecoilState(postsAtom)
    const [isloading,setloading] = useState(true)

    const showToast = useShowToast()
    useEffect(()=>{
        const getFeedPost = async()=>{
            setloading(true)
            try {
                const res = await fetch("/api/posts/feed")
                const data = await res.json()
                if(data.error){
                    showToast("Error",data.error,"error")
                    return
                }
                setPosts(data)
            } catch (error) {
                showToast("Error",error,"error")
            } finally {
                setloading(false)
            }
        }
        getFeedPost()
    },[showToast,setPosts])
    return (
        <>
            {!isloading && posts.length==0 && <h1>Follow some users to view the posts.</h1>}
            {isloading && (
                <Flex justify={"center"}>
                    <Spinner size={"xl"}></Spinner>
                </Flex>
            )}
            {posts.map((post)  => (
                <Post key={post._id} post={post} postedBy={post.postedBy}></Post>  
            ))}
        </>
    )
}

export default HomePage