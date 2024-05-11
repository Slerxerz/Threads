import { Avatar, Flex, Text,useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtom'
import userAtom from '../atoms/userAtom'

const Message = ({ownMessage,message}) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const user = useRecoilValue(userAtom)
  return (
    <>  
    {ownMessage ?(
        <Flex gap={2} alignSelf={"flex-end"}>
            <Text maxW={"300px"} bg={useColorModeValue("blue.400","blue.500")} p={2}  borderRadius={"md"}>
            {message.text}</Text>
            <Avatar w={7} h={7} src={user.profilePicture}/>
        </Flex>
        ):(
        <Flex gap={2}>
            <Avatar src={selectedConversation.userprofilePicture} w={7} h={7}/>
            <Text maxW={"300px"} bg={useColorModeValue("gray.400","gray.light")} p={2}  borderRadius={"md"}>
            {message.text}
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message