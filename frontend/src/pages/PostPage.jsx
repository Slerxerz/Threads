import { Box,Spinner } from "@chakra-ui/react";
import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import useShowToast from "../hooks/useShowToast";
import { MenuButton,MenuList,Menu,Portal,MenuItem } from "@chakra-ui/react"
import {formatDistanceToNow} from "date-fns"
import { Divider, Button } from "@chakra-ui/react";
import Comment from "../components/Comment";
import {DeleteIcon}  from "@chakra-ui/icons";
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";

const PostPage = () => {
    const showToast = useShowToast()
    const {user,loading} = useGetUserProfile()
    const [post,setPost]= useState(null)
    const {pid}=useParams()
    const currentUser = useRecoilValue(userAtom)
    const navigate = useNavigate()

    useEffect(() => {
        const getPost = async ()=>{
            try {
                const res = await fetch(`/api/posts/${pid}`)
                const data = await res.json()
                if(data.error){ 
                    showToast("Error",data.error,"error") 
                    return
                }else{
                    setPost(data)
                }
            } catch (error) {
                showToast("Error",error,"error")
            }
        }
        getPost()
    }, [showToast,pid]);

    if(!user && loading){
        return(
            <Flex w={"full"} h={"full"} justifyContent={"center"} alignItems={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        )
    } 

    if(!post){
        return null
    }
    const handleDeletePost = async () => {
        try {
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
            navigate(`/${user.username}`)
        } catch (error) {
            showToast("Error",error,"error" )
        }
    }

    const copyURL=()=>{
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(()=>{
            showToast("Success","Post link copied","success")
        })
    }
return ( 
    <>
        <Flex>
            <Flex w={"full"} alignItems = {"center"} gap={3}>
                <Avatar src={user.profilePicture} size={"md"} name={user.name} />
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        {user.username}
                    </Text>
                    <Image src='/verified.png' w='4' h={4} ml={4} />
                </Flex>
            </Flex>
                <Flex gap={4} alignItems={"center"} onClick={(e) => e.preventDefault()}>
                        <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"}>
                            {formatDistanceToNow(new Date(post.createdAt))} ago
                        </Text>
                        {currentUser?._id === user._id && <DeleteIcon cursor={"pointer"}onClick={handleDeletePost}/>}
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
        <Text my={3}>{post.text}</Text>
        {post.img && <Box borderRadius={6} overflow={"hidden"} border={"1px"} borderColor={"gray.light"}>
            <Image src={post.img} w={"full"}/>
        </Box>}
        <Flex gap={3} my={3}>
            <Actions post={post}/>
        </Flex>
        <Divider my={4}/>
        <Flex justifyContent={"space-between"}>
            <Flex gap={2} alignItems={"center"}>
                <Text fontSize={"2xl"}>👋</Text>
                <Text color={"gray.light"}>Get the app to like, reply.</Text>
            </Flex>
            <Button>
                Get
            </Button>
        </Flex>
        <Divider my={3}></Divider>
        {post.replies.map(reply=>(
            <Comment
            key={reply._id}
            reply = {reply}
            lastReply = {reply._id===post.replies[post.replies.length-1]._id}
            />
        ))}
    </>
    );
};
export default PostPage;