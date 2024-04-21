import { useState } from "react"
import { Avatar, Divider, Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"

const Comment = ({userAvatar,createdAt,comment,likes,username}) => {
    const [liked,setLiked]=useState(false)
  return (
    <>
    <Flex gap={4} py={3} my={3} w={"full"}>
        <Avatar src={userAvatar} size={"sm"}/>
        <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                    <BsThreeDots/>
                </Flex>
            </Flex>
            <Text>{comment}</Text>
            <Actions liked={liked} setLiked={setLiked}/>
            <Text color={"gray.light"} fontSize={"sm"}>{ likes + ( liked ? 1 : 0 )} likes</Text>
        </Flex>
    </Flex>
    <Divider my={3}/>
    </>
  )
}

export default Comment