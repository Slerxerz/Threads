import { Avatar, Divider, Flex } from "@chakra-ui/react"
import { Text } from "@chakra-ui/react"

const Comment = ({reply,lastReply}) => {
  return (
    <>
    <Flex gap={4} py={3} my={3} w={"full"}>
        <Avatar src={reply.userProfilePicture} size={"sm"}/>
        <Flex gap={1} w={"full"} flexDirection={"column"}>
            <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
            </Flex>
            <Text>{reply.text}</Text>
        </Flex>
    </Flex>
    {!lastReply && <Divider my={3}/>}
    </>
  )
}

export default Comment