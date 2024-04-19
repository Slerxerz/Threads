import { Box,Flex,VStack,Text, Spacer,Link,Avatar, MenuButton,MenuList,Menu,Portal,MenuItem } from "@chakra-ui/react"
import {BsInstagram } from "react-icons/bs"
import { CgMoreO } from "react-icons/cg"
import { useToast } from "@chakra-ui/react"

const UserHeader = () => {
    const toast = useToast()
    const copyURL=()=>{
        const currentURL = window.location.href
        navigator.clipboard.writeText(currentURL).then(()=>{
            toast({
                description:"Profile link copied",
                status:"success",
                duration:2000,
                isClosable:true,
                position:"top-right",
            })
        })
    }
  return (
    <VStack gap= {4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
            <Box>
                <Text fontSize={"2xl"} fontWeight={"bold"}>Mark Zukerberg</Text>
                <Spacer h={3}></Spacer>
                <Flex gap ={2} alignItems={"center"}>
                    <Text fontSize={"sm"}>markzuckerberg</Text>
                    <Text fontSize={"xs"} bg = {"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>
                        threads.net
                    </Text>
                </Flex>
            </Box>
            <Box>
                <Avatar name="Mark Zuckerberg" src="/zuck-avatar.png" size={"xl"}/>
            </Box>
        </Flex>
        <Text>Co-founder, executive chairman and CEO of Meta Platform</Text>
        <Flex w={"full"} justifyContent={"space-between"}>
            <Flex gap = {2} alignItems={"center"}>
                <Text color={"gray.light"}>3.2k followers</Text>
                <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                <Link color={"gray.light"}>instagram.com</Link>
            </Flex>
            <Flex>
                <Box className='icon-container'>
                    <BsInstagram size={24} cursor={"Pointer"}/>
                </Box>
                <Box className='icon-container'>
                    <Menu>
                        <MenuButton>
                            <CgMoreO size={24} cursor={"Pointer"}/>
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
        <Flex w={"full"}>
            <Flex flex={1} borderBottom={"1.5px solid white"} justify={"center"} pb={3} cursor={"pointer"}>
                <Text fontWeight={"Bold"}>Threads</Text>
            </Flex>
            <Flex flex={1} borderBottom={"1px solid gray"} justify={"center"} color={"gray.light"} pb={3} cursor={"pointer"}>
            <Text fontWeight={"Bold"}>Replies</Text>
            </Flex>
        </Flex>
    </VStack>
  )
}

export default UserHeader