import { Box } from "@chakra-ui/react";
import { Avatar, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import Actions from "../components/Actions";
import {useState} from 'react'
import { MenuButton,MenuList,Menu,Portal,MenuItem } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"
import { Divider, Button } from "@chakra-ui/react";
import Comment from "../components/Comment";

const PostPage = () => {
    const toast = useToast()
    const copyURL=()=>{
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                description:"Post link copied",
                status:"success",
                duration:2000,
                isClosable:true,
                position:"top-right",
            })
        })
    }
    const [liked,setLiked]=useState(false)
return ( 
    <>
        <Flex>
            <Flex w={"full"} alignItems = {"center"} gap={3}>
                <Avatar src='/zuck-avatar.png' size={"md"} name='Mark Zuckerberg' />
                <Flex>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                        markzuckerberg
                    </Text>
                    <Image src='/verified.png' w='4' h={4} ml={4} />
                </Flex>
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
        <Text my={3}>Let's talk about threads.</Text>
        <Box borderRadius={6} overflow={"hidden"} border={"1px"} borderColor={"gray.light"}>
            <Image src='/post1.png' w={"full"}/>
        </Box>
        <Flex gap={3} my={3}>
            <Actions liked={liked} setLiked={setLiked}/>
        </Flex>
        <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
            <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
            <Text color={"gray.light"} fontSize={"sm"}>{ 12 + ( liked ? 1 : 0 )} likes</Text>
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
        <Comment
            comment="Looks really good."
            createdAt="2d"
            likes={100}
            username="johndoe"
            userAvatar="https://bit.ly/dan-abramov"
        />
        <Comment
            comment="Wow this is amazing."
            createdAt="1d"
            likes={133}
            username="codebeast"
            userAvatar="https://bit.ly/code-beast"
        />
        <Comment
            comment="Now we're talking."
            createdAt="1d"
            likes={32}
            username="kentdodds"
            userAvatar="https://bit.ly/kent-c-dodds"
        />
    </>
    );
};
export default PostPage;