import { AddIcon } from '@chakra-ui/icons'
import { Button, CloseButton, Flex, FormControl, Image, Input, Text, Textarea, useColorModeValue } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDisclosure } from '@chakra-ui/react'
import { Modal,ModalHeader,ModalCloseButton,ModalBody,ModalOverlay,ModalFooter,ModalContent } from '@chakra-ui/react'
import usePreviewImage from '../hooks/usePreviewImage';
import { useRef } from 'react'
import {BsFillImageFill} from 'react-icons/bs'
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom"
import useShowToast from "../hooks/useShowToast"

const MAX_CHAR = 500; 

const CreatePost = () => {
    const showToast = useShowToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [postText,setPostText] = useState('')
    const {handleImageChange,imageURL,setImageURL} = usePreviewImage()
    const imageRef= useRef(null)
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR);
    const user = useRecoilValue(userAtom)
    const [loading, setLoading] = useState(false);


    const handleTextChange = (e) => {
		const inputText = e.target.value;

		if (inputText.length > MAX_CHAR) {
			const truncatedText = inputText.slice(0, MAX_CHAR);
			setPostText(truncatedText);
			setRemainingChar(0);
		} else {
			setPostText(inputText);
			setRemainingChar(MAX_CHAR - inputText.length);
		}
	};

    const handleCreatePost = async () => {
		setLoading(true);
		try {
			const res = await fetch("/api/posts/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ postedBy: user._id, text: postText, img: imageURL }),
			});

			const data = await res.json();
			if (data.error) {
				showToast("Error", data.error, "error");
				return;
			}
			showToast("Success", "Post created successfully", "success");
			// if (username === user.username) {
			// 	setPosts([data, ...posts]);
			// }
      onClose();
      setPostText("");
      setImageURL("");
		} catch (error) {
			showToast("Error", error, "error");
		} 
      finally {
        setLoading(false);
		}
	};

  return (
    <>
        <Button 
        position={"fixed"}
        bottom={10}
        right={10}
        leftIcon={<AddIcon/>}
        bg={useColorModeValue("gray.300","gray.dark")}
        onClick={onOpen}
        >
        Post
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={useColorModeValue("white","gray.dark")}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            
            <FormControl>
                <Textarea
                    placeholder='Post Content goes here'
                    onChange={handleTextChange}
                    value={postText}
                />
                <Text fontSize={"xs"}
                    fontWeight={"bold"}
                    textAlign={"right"}
                    m={"1"}
                    color={"gray.400"}
                >
                    {remainingChar}/{MAX_CHAR}
                </Text>
                <Input
                    type='file'
                    hidden
                    ref={imageRef}
                    onChange={handleImageChange}
                />
                <BsFillImageFill style={{marginLeft:"5px",cursor:"pointer"}}
                size={16} onClick={()=> imageRef.current.click()}/>
            </FormControl>
            
            {imageURL && (
                <Flex mt={5} w={"full"} position={"relative "}>
                    <Image src={imageURL} alt='Selected Image'/>
                    <CloseButton onClick={()=> setImageURL("")} bg={useColorModeValue("gray.300","gray.dark")} position={"absolute"}
                    top={2} right={2}/>
                </Flex>
            )}
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleCreatePost} isLoading={loading}>
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreatePost