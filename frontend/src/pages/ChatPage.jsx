import { Box, Flex,Text,Input,Button,useColorModeValue,SkeletonCircle,Skeleton } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import {SearchIcon} from "@chakra-ui/icons"
import Conversation from '../components/Conversation'
import useShowToast from "../hooks/useShowToast"
import {GiConversation} from 'react-icons/gi'
import MessageContainer from '../components/MessageContainer'
import { useRecoilState } from 'recoil'
import { conversationsAtom } from '../atoms/messagesAtom'

const ChatPage = () => {
    const showToast = useShowToast()
	const[loadingConversation,setloadingConversation] = useState(true)
	const [conversations,setConversations] = useRecoilState(conversationsAtom)

	useEffect(()=>{
		const getConversations = async () => {
			try {
				const res = await fetch("/api/messages/conversations")
                const data = await res.json()
                if(data.error){
                    showToast("Error",data.error,"error")
                    return
                }
                console.log(data)
                setConversations(data)
				
			} catch (error) {
				showToast("Error",error,"error")
			} finally{
				setloadingConversation(false)
			}
		}
		getConversations()
	},[showToast,setConversations])

  return (
    <Box position={"absolute"} left={"50%"} w={{
      base:"100%",
      md:"80%",
      lg:"750px"
    }}
     p={4} transform={"translateX(-50%)"}>
      <Flex
        gap={4}
				flexDirection={{ base: "column", md: "row" }}
				maxW={{
					sm: "400px",
					md: "full",
				}}
				mx={"auto"}
      >
        <Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full" }} mx={"auto"}>
					<Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
						Your Conversations
					</Text>
					<form >
						<Flex alignItems={"center"} gap={2}>
							<Input placeholder='Search for a user'/>
							<Button size={"sm"} >
								<SearchIcon />
							</Button>
						</Flex>
					</form>
			{loadingConversation && (
				[0,1,2,3,4].map((_,i) =>(
					<Flex key={i} alignItems={"center"} gap={4} padding={1} borderRadius={"md"}>
						<Box>
							<SkeletonCircle size={"10"}/>
						</Box>
						<Flex flexDirection={"column"} w={"full"} gap={3}>
							<Skeleton h={"10px"} w={"80px"}/>
							<Skeleton h={"8px"} w={"90%"}/>
						</Flex>
					</Flex>
				))
			)}

			{!loadingConversation && (
				conversations.map(conversation =>(
                    <Conversation key={conversation._id} conversation={conversation}/>
                ))
			)}

		</Flex>
		{/* <Flex flex={70} borderRadius={"md"} p={2} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} height={"400px"}>
			<GiConversation size={100}/>
			<Text fontSize={20}>Select a User to start conversation</Text>
		</Flex> */}
			<MessageContainer/>
      </Flex>
    </Box>
  )
}

export default ChatPage