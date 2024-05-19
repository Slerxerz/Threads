import { Button, Text } from "@chakra-ui/react"

const SettingsPage = () => {
    const freezeAccount = async() => {}
  return (
    <>
    <Text my={1} fontWeight={"bold"} fontSize={25}>Freeze your Account</Text>
    <Text my={1}>You can unfreeze your Account anytime by logging in.</Text>
    <Button
    my={1}
    size={"sm"}
    colorScheme="red"
    onClick={freezeAccount}
    >Freeze</Button>
    </>
  )
}

export default SettingsPage