import { Button,Flex } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const HomePage= () => {
    return (
        <Flex justify={"center"} mt="6" mb="12">
            <Link to={"/:id"}>
                <Button>User Page</Button>
            </Link>
        </Flex>
    )
}

export default HomePage