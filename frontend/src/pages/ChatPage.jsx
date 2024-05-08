import { Box, Flex,Text,Input,Button,useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import {SearchIcon} from "@chakra-ui/icons"

const ChatPage = () => {
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
				</Flex>
      </Flex>
    </Box>
  )
}

export default ChatPage