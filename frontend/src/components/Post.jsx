import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Text,Image } from "@chakra-ui/react"
import {BsThreeDots} from "react-icons/bs"
import Actions from "./Actions";
import { useEffect, useState } from "react";
import { MenuButton,MenuList,Menu,Portal,MenuItem } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import useShowToast from "../hooks/useShowToast";

const Post = ({post,postedBy}) => {
    const showToast = useShowToast()
    const [liked,setLiked]=useState(false)
    const [user,setUser]=useState(null)
    //fetch the user
    useEffect(() =>{
        const getUser = async ()=>{
            try {
                const res = await fetch("/api/users/profile/"+postedBy)
                const data = await res.json()
                console.log(data)
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
    <Link to={"/markzuckerberg/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size='md' name={user.name} src={user.profilePicture} bg={"gray.dark"}/>
                <Box w='1px' h={"full"} bg='gray.light' mt={2} mb={1}></Box>
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
                        top={"-5px"}
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
                        right="1px"
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
                        left="0px"
                        padding={"2px"}
                        />)
                    }
                    
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{user?.username}</Text>
                        <Image src ="/verified.png" w={4} h={4} ml={1}></Image>
                    </Flex>
                    <Flex gap={4} alignItems={"center"} onClick={(e) => e.preventDefault()}>
                        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                        <Flex>
                            <Box>
                                <Menu>
                                    <MenuButton>
                                    <BsThreeDots cursor={"pointer"}/>
                                    </MenuButton>
                                    <Portal>
                                        <MenuList bg={"gray.dark"}>
                                            <MenuItem bg={"gray.dark"} onClick={copyURL}>
                                                Copy Link
                                            </MenuItem>
                                        </MenuList>
                                    </Portal>
                                </Menu>
                            </Box>
                        </Flex>
                    </Flex>
                </Flex>

                <Text fontSize={"sm"}>{post.text}</Text>
                {post.img && (
                    <Box borderRadius={6} overflow={"hidden"} border={"1px"} borderColor={"gray.light"}>
                    <Image src={post.img} w={"full"}/>
                </Box>
                )}
                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>
                <Flex gap = {2} alignItems={"center"}>
                    <Text color={"gray.light"} fontSize={"sm"}>{post.replies.length} replies</Text>
                    <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Text color={"gray.light"} fontSize={"sm"}>{post.likes.length + ( liked ? 1 : 0 )} likes</Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
    );
};
export default Post;