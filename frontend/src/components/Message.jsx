import { Avatar, Flex, Text,useColorModeValue,Box } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtom'
import userAtom from '../atoms/userAtom'
import { BsCheck2All } from 'react-icons/bs'

const Message = ({ownMessage,message}) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const user = useRecoilValue(userAtom)
  return (
    <>  
    {ownMessage ?(
        <Flex gap={2} alignSelf={"flex-end"}>
          <Flex bg={useColorModeValue("green.400","green.400")} maxW={"350px"} p={1} borderRadius={"md"}>
            <Text ml={1} color={"white"}>{message.text}</Text>
            <Box alignSelf={"flex-end"} ml={1} color={message.seen? "blue.400":""} fontWeight={"bold"}>
              <BsCheck2All size={16} />
            </Box>
          </Flex>
            <Avatar w={7} h={7} src={user.profilePicture}/>
        </Flex>
        ):(
        <Flex gap={2}>
            <Avatar src={selectedConversation.userprofilePicture} w={7} h={7}/>
            <Text maxW={"300px"} bg={useColorModeValue("gray.300","gray.light")} p={2}  borderRadius={"md"}>
            {message.text}
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message