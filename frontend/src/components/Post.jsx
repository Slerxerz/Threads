import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex} from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import { Text,Image } from "@chakra-ui/react"
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from "date-fns"
import {DeleteIcon}  from "@chakra-ui/icons";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";


const Post = ({post,postedBy}) => {
    const showToast = useShowToast()
    const [user,setUser]=useState(null)
    const [noOfReply,setNoOfReply]=useState(post.replies.length)
    const navigate = useNavigate()
    const currentUser = useRecoilValue(userAtom)
    const [posts,setPosts] = useRecoilState(postsAtom)

    //fetch the user
    useEffect(() =>{
        const getUser = async ()=>{
            try {
                const res = await fetch("/api/users/profile/"+postedBy)
                const data = await res.json()
                if (data.error) {
                    showToast("Error",data.error,"error")
                    return
                }
                setUser(data)
            } catch (error) {
                showToast("Error",error,"error" )
                setUser(null)
            }
        }
        getUser()
    },
    [postedBy,showToast])

    const handleDeletePost = async (e) => {
        try {
            e.preventDefault()
            if(!window.confirm("Are you sure you want to delete this post?")) return
            const res = await fetch(`/api/posts/delete/${post._id}`,{
                method:"DELETE"
            })
            const data = await res.json()
            if (data.error) {
                showToast("Error",data.error,"error")
                return
            }
            showToast("Success",data.message,"success")
            setPosts(posts.filter((p) => p._id!==post._id))
        } catch (error) {
            showToast("Error",error,"error" )
        }
    }

    const copyURL=()=>{
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(()=>{
            showToast("Success","Post Link Copied","success")
        })
    }

    if(!user) return null

    return (
    <Link to={`/${user.username}/post/${post._id}`}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size='md' name={user.name} src={user.profilePicture} bg={"gray.dark"}
                onClick={(e)=>{
                    e.preventDefault()
                    navigate(`/${user.username}`)
                }}/>
                <Box w='1px' h={"full"} bg='gray.light' mt={2} mb={noOfReply<1?2:7}></Box>
                <Box position={"relative"} w={"full"}>
                    {
                        post.replies.length===0 && (<Text textAlign={"center"}>🥱</Text>)
                    }
                    {
                        post.replies[0] && (<Avatar
                        size="xs"
                        name={post.replies[0].username}
                        src={post.replies[0].userProfilePicture}
                        position={"absolute"}
                        top={"-3px"}
                        left="11.5px"
                        padding={"2px"}
                        />)
                    }
                    {
                        post.replies[1] && (<Avatar
                        size="xs"
                        name={post.replies[1].username}
                        src={post.replies[1].userProfilePicture}
                        position={"absolute"}
                        bottom={"0px"}
                        right="0px"
                        padding={"2px"}
                        />)
                    }
                    {
                        post.replies[2] && (<Avatar
                        size="xs"
                        name={post.replies[2].username}
                        src={post.replies[2].userProfilePicture}
                        position={"absolute"}
                        bottom={"0px"}
                        left="-1px"
                        padding={"2px"}
                        />)
                    }
                    
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}
                        onClick={(e)=>{
                            e.preventDefault()
                            navigate(`/${user.username}`)
                        }}>
                            {user?.username}
                        </Text>
                        <Image src ="/verified.png" w={4} h={4} ml={1}></Image>
                    </Flex>
                    <Flex gap={4} alignItems={"center"} onClick={(e) => e.preventDefault()}>
                        <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                            {formatDistanceToNow(new Date(post.createdAt))} ago
                        </Text>
                        {currentUser?._id === user._id && <DeleteIcon onClick={handleDeletePost}/>}
                    </Flex>
                </Flex>

                <Text fontSize={"sm"}>{post.text}</Text>
                {post.img && (
                    <Box borderRadius={6} overflow={"hidden"} border={"1px"} borderColor={"gray.light"}>
                    <Image src={post.img} w={"full"}/>
                </Box>
                )}
                <Flex gap={3} my={1}>
                    <Actions post={post}/>
                </Flex>
                
            </Flex>
        </Flex>
    </Link>
    );
};
export default Post;