import { Avatar, AvatarBadge, Flex, Stack, Text, WrapItem, useColorModeValue, Image, useColorMode, Box } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import {BsCheck2All} from 'react-icons/bs'
import { selectedConversationAtom } from '../atoms/messagesAtom'

const Conversation = ({conversation,isOnline}) => {
    const user = conversation.participants[0]
    const currentUser = useRecoilValue(userAtom)
    const lastMessage = conversation.lastMessage
    const [selectedConversation,setselectedConversation] = useRecoilState(selectedConversationAtom)
    const {colorMode} = useColorMode()
  return (
    <Flex
    gap={4} alignItems={"center"} p={"1"} _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.300", "gray.dark"),
        color: useColorModeValue("white", "gray.light"),
    }}
    onClick={()=>setselectedConversation({
        _id: conversation._id,
        userId:user._id,
        username:user.username,
        userprofilePicture:user.profilePicture,
        mock:conversation.mock
    })}
    bg={selectedConversation?._id === conversation._id?(colorMode==="light"?"gray.300": "gray.dark"):""}
    borderRadius={"md"}
    >
        <WrapItem>
            <Avatar size={{
                base: "xs",
                sm:"sm",
                md: "md"
                }}
                src={user.profilePicture}
            >
            {isOnline? <AvatarBadge boxSize={"1em"} bg={"green.500"}/>: ""}
            </Avatar>
        </WrapItem>
        <Stack direction={"column"} fontSize={"sm"}>
            <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
                {user.username} <Image src="/verified.png" w={4} h={4} ml={1}/>
            </Text>
            <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                {currentUser._id === lastMessage.sender? (
                <Box color={lastMessage.seen?"blue.400":""}>
                    <BsCheck2All size={16}/>
                </Box>) : ''}
                {lastMessage.text.length>18 ? lastMessage.text.substring(0,18)+"...":lastMessage.text}
            </Text>
        </Stack>
    </Flex>
  )
}

export default Conversation