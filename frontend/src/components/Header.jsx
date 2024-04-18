import { Center, Flex, Image,useColorMode } from "@chakra-ui/react"

const Header = () => {
    const {colorMode,toggleColorMode} = useColorMode()
  return (
    <Flex justify={"center"} mt="6" mb="12">
        <Image
            cursor={"pointer"}
            alt='logo'
            w={10}
            src={colorMode==="dark"? '/light-logo.svg' : '/dark-logo.svg'}
            onClick={toggleColorMode}
        />
    </Flex>
  )
}

export default Header