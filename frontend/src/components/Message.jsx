import { Avatar, Flex, Text,useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const Message = ({ownMessage}) => {
  return (
    <>  
    {ownMessage ?(
        <Flex gap={2} alignSelf={"flex-end"}>
            <Text maxW={"300px"} bg={useColorModeValue("blue.400","blue.500")} p={2}  borderRadius={"md"}>
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita facere aliquid corrupti, nemo numquam optio tempora consequatur vitae velit et.            </Text>
            <Avatar w={7} h={7} src=''/>
        </Flex>
        ):(
        <Flex gap={2}>
            <Avatar w={7} h={7} src=''/>
            <Text maxW={"300px"} bg={useColorModeValue("gray.400","gray.light")} p={2}  borderRadius={"md"}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Adipisci quam expedita harum saepe nesciunt ad reprehenderit aliquid praesentium repellendus a!
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message