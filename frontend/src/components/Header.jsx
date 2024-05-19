import { Flex, Image,Link,useColorMode } from "@chakra-ui/react"
import { useRecoilValue, useSetRecoilState } from "recoil"
import userAtom from "../atoms/userAtom"
import {  AiFillHome  } from "react-icons/ai";
import {Link as RouterLink} from "react-router-dom"
import {RxAvatar} from "react-icons/rx"
import authScreenAtom from "../atoms/authAtom";
import { BsFillChatQuoteFill } from "react-icons/bs";
const Header = () => {
    const {colorMode,toggleColorMode} = useColorMode()
    const user = useRecoilValue(userAtom)
    const setAuthScreen = useSetRecoilState(authScreenAtom)

  return (
    <Flex justify={"space-around"} mt="6" mb="12">

      {user && <Link as={RouterLink} to ="/">
        <AiFillHome size={28}/>
      </Link>}
      {!user && <Link as={RouterLink} to ={"/auth"} onClick={()=>setAuthScreen('login')}>
        Login
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
            <RxAvatar size={28}/>
          </Link>
          <Link as={RouterLink} to ={`/chat`}>
            <BsFillChatQuoteFill size={28}/>
          </Link>
        </Flex>
        )}
        {!user && <Link as={RouterLink} to ={"/auth"} onClick={()=>setAuthScreen('signup')}>
        Sign Up
      </Link>}
    </Flex>
    
  )
}

export default Header