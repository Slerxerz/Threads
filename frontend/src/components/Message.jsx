import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ownMessage}) => {
  return (
    <>  
    {ownMessage ?(
        <Flex gap={2} alignSelf={"flex-end"}>
            <Text maxW={"300px"} bg={"blue.400"} p={2}  borderRadius={"md"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et voluptas iure doloribus quod veniam fugit fugiat omnis laboriosam aliquid ipsa ex doloremque quae sit obcaecati dicta, porro maiores alias odio qui, nesciunt rerum tempore deserunt. Velit asperiores vel quod ab quidem dolore nostrum autem, inventore ex esse distinctio architecto.
            </Text>
            <Avatar mr={1} w={7} h={7} src=''/>
        </Flex>
        ):(
        <Flex gap={2}>
            <Avatar w={7} h={7} src=''/>
            <Text maxW={"300px"} bg={"blue.400"} p={2}  borderRadius={"md"}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit et voluptas iure doloribus quod veniam fugit fugiat omnis laboriosam aliquid ipsa ex doloremque quae sit obcaecati dicta, porro maiores alias odio qui, nesciunt rerum tempore deserunt. Velit asperiores vel quod ab quidem dolore nostrum autem, inventore ex esse distinctio architecto.
            </Text>
        </Flex>
    )}
    </>
  )
}

export default Message