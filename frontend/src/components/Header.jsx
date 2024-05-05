import { Flex, Image,Link,useColorMode,Button,useColorModeValue } from "@chakra-ui/react"
import { useRecoilValue } from "recoil"
import userAtom from "../atoms/userAtom"
import {  AiFillHome  } from "react-icons/ai";
import {Link as RouterLink} from "react-router-dom"
import {FiLogOut} from "react-icons/fi"
import {RxAvatar} from "react-icons/rx"
import useLogout from "../hooks/useLogout";

const Header = () => {
    const {colorMode,toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
    const logout = useLogout()

  return (
    <Flex justify={"space-between"} mt="6" mb="12">
      {user && <Link as={RouterLink} to ="/">
        <AiFillHome size={30}/>
      </Link>}
        <Image
            cursor={"pointer"}
            alt='logo'
            w={10}
            src={colorMode==="dark"? '/light-logo.svg' : '/dark-logo.svg'}
            onClick={toggleColorMode}
        />
        {user && (
        <Flex alignItems={"center"} gap={4}>
          <Link as={RouterLink} to ={`/${user.username}`}>
            <RxAvatar size={30}/>
          </Link>
          <Button
            size={"xs"} bg={useColorModeValue("gray.300","gray.dark")} onClick={logout}>
            <FiLogOut size={20}/>
          </Button>
        </Flex>
        )}
    </Flex>
    
  )
}

export default Header