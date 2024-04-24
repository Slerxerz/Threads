import { Avatar } from "@chakra-ui/avatar";
import { Box, Flex} from "@chakra-ui/layout";
import { Link } from "react-router-dom";
import { Text,Image } from "@chakra-ui/react"
import {BsThreeDots} from "react-icons/bs"
import Actions from "./Actions";
import { useState } from "react";
import { MenuButton,MenuList,Menu,Portal,MenuItem } from "@chakra-ui/react"
import { useToast } from "@chakra-ui/react"

const UserPost = ({postImg,postTitle,likes,replies}) => {

    const toast = useToast()
    const copyURL=()=>{
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                description:"Post link copied",
                status:"success",
                duration:3000,
                isClosable:true,
                position:"top-right",
            })
        })
    }
    const [liked,setLiked]=useState(false)

    return (
    <Link to={"/markzuckerberg/post/1"}>
        <Flex gap={3} mb={4} py={5}>
            <Flex flexDirection={"column"} alignItems={"center"}>
                <Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png' />
                <Box w='1px' h={"full"} bg='gray.light' mt={2} mb={7}></Box>
                <Box position={"relative"} w={"full"}>
                    <Avatar
                    size="xs"
                    name="John doe"
                    src="https://bit.ly/kent-c-dodds"
                    position={"absolute"}
                    top={"-5px"}
                    left="11.5px"
                    padding={"2px"}
                    />
                    <Avatar
                    size="xs"
                    name="John doe"
                    src="https://bit.ly/dan-abramov"
                    position={"absolute"}
                    bottom={"0px"}
                    right="1px"
                    padding={"2px"}
                    />
                    <Avatar
                    size="xs"
                    name="John doe"
                    src="https://bit.ly/code-beast"
                    position={"absolute"}
                    bottom={"0px"}
                    left="0px"
                    padding={"2px"}
                    />
                </Box>
            </Flex>
            <Flex flex={1} flexDirection={"column"} gap={2}>
                <Flex justifyContent={"space-between"}>
                    <Flex w={"full"} alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>markzuckerberg</Text>
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

                <Text fontSize={"sm"}>{postTitle}</Text>
                {postImg && (
                    <Box borderRadius={6} overflow={"hidden"} border={"1px"} borderColor={"gray.light"}>
                    <Image src={postImg} w={"full"}/>
                </Box>
                )}
                <Flex gap={3} my={1}>
                    <Actions liked={liked} setLiked={setLiked}/>
                </Flex>
                <Flex gap = {2} alignItems={"center"}>
                    <Text color={"gray.light"} fontSize={"sm"}>{replies} replies</Text>
                    <Box w={0.5} h={0.5} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Text color={"gray.light"} fontSize={"sm"}>{likes + ( liked ? 1 : 0 )} likes</Text>
                </Flex>
            </Flex>
        </Flex>
    </Link>
    );
};
export default UserPost;