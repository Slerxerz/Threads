import { Flex, useColorModeValue,Avatar,Text, Image, Divider,Box,Skeleton,SkeletonCircle } from "@chakra-ui/react"
import Message from "./Message"

const MessageContainer = () => {
  return (
    <Flex flex={70} bg={useColorModeValue("gray.200","gray.dark")}
            borderRadius={"md"}
            flexDirection={"column"}
            p={2}
    >
        {/* {Message Headers} */}
        <Flex w={"full"} h={12} alignItems={"center"} gap={2} p={2}>
            <Avatar src="" size={"sm"}/>
            <Text fontWeight={700} display={"flex"} alignItems={"center"}>
                johndoe <Image src="/verified.png" w={4} h={4} ml={1}/>
            </Text>
        </Flex>

        <Divider/>
        
        <Flex flexDir={"column"} gap={4} my={4}
        height={"400px"} overflowY={"scroll"}>

            {false && (
                [0,1,2,3,4,5].map((_,i) =>(
					<Flex key={i} alignItems={"center"} gap={2} padding={1} 
                        borderRadius={"md"} alignSelf={i%2===0?"flex-start":"flex-end"}>
                        {i%2===0 && <SkeletonCircle size={7}/>}
						<Flex flexDirection={"column"} gap={2}>
							<Skeleton h={"8px"} w={"250px"}/>
							<Skeleton h={"8px"} w={"250px"}/>
							<Skeleton h={"8px"} w={"250px"}/>
						</Flex>
                        {i%2 !== 0 && <SkeletonCircle size={7}/>}
					</Flex>
				))
            )}

            <Message ownMessage={true}/>
            <Message ownMessage={false}/>
            <Message ownMessage={false}/>
            <Message ownMessage={true}/>

        </Flex>
    </Flex>
  )
}

export default MessageContainer