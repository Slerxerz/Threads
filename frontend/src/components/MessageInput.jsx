import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react'
import useShowToast from "../hooks/useShowToast"
import {IoSendSharp} from 'react-icons/io5'
import { selectedConversationAtom,conversationsAtom } from '../atoms/messagesAtom'
import { useRecoilState, useSetRecoilState } from 'recoil'

const MessageInput = ({setMessages}) => {
  const showToast = useShowToast()
	const [selectedConversation,setSelectedConversation] = useRecoilState(selectedConversationAtom)
  const [messageText, setMessageText] = useState("")
  const setConversations = useSetRecoilState(conversationsAtom)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if(!messageText) return
    try {
      const res = await fetch("api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId 
        })
      })
      const data = await res.json()
      if(data.error) {
        showToast("Error", data.error, "error")
        return
      }
      setMessages(messages => [...messages, data])
      setConversations(prevConv => {
        const updatedConversation = prevConv.map(conversation =>{
          if(conversation._id === selectedConversation._id){
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender
              }
            }
          }
          return conversation
        })
        return updatedConversation
      })
      setMessageText("")
    } catch (error) {
				showToast("Error",error,"error")
    }
  }
  return (
    <form >
        <InputGroup>
            <Input w={"full"}
            placeholder='Type a message' onChange={(e)=> setMessageText(e.target.value)}
              value={messageText}
            />
            <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
                <IoSendSharp />
            </InputRightElement>
        </InputGroup>
    </form>
  )
}

export default MessageInput