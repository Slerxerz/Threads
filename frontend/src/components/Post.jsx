import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex} from "@chakra-ui/layout";
import { Link, useNavigate } from "react-router-dom";
import { Text,Image } from "@chakra-ui/react"
import Actions from "./Actions";
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import {formatDistanceToNow} from "date-fns"


const Post = ({post,postedBy}) => {
    const showToast = useShowToast()
    const [user,setUser]=useState(null)
    const [noOfReply,setNoOfReply]=useState(post.replies.length)
    const navigate = useNavigate()
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
    },[postedBy,showToast])

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
                <Box w='1px' h={"full"} bg='gray.light' mt={2} mb={noOfReply<1?1:7}></Box>
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