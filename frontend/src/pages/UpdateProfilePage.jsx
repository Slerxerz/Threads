import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    Avatar,
    Center,
  } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import usePreviewImage from '../hooks/usePreviewImage';
  
  const UpdateProfilePage=()=> {
    const [user,setUser]= useRecoilState(userAtom)
    const [inputs,setInputs]= useState({
        name:user.name,
        username:user.username,
        email:user.email,
        bio:user.bio,
        password:'',
    })
    const fileRef = useRef(null)
    const {handleImageChange} = usePreviewImage
    return (
      <Flex
        align={'center'}
        justify={'center'}
        my={6}>
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.dark')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}>
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }} textAlign={"center"}>
            User Profile Edit
          </Heading>
          <FormControl id="userName">
            <Stack direction={['column', 'row']} spacing={6}>
              <Center>
                <Avatar size="xl" boxShadow={"md"} src={user.profilePicture}/>
              </Center>
              <Center w="full">
                <Button w="full" onClick={()=>fileRef.current.click()}>Change Avatar</Button>
                <Input type='file' hidden ref={fileRef} onChange={handleImageChange}/>
              </Center>
            </Stack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input
              placeholder="John Doe"
              value={inputs.name}
              onChange={(e)=>setInputs({...inputs,name:e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="johndoe"
              value={inputs.username}
              onChange={(e)=>setInputs({...inputs,username: e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="your-email@example.com"
              value={inputs.email}
              onChange={(e)=>setInputs({...inputs,email: e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="email"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Bio</FormLabel>
            <Input
              placeholder="Your Bio"
              value={inputs.bio}
              onChange={(e)=>setInputs({...inputs,bio: e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="text"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              placeholder="Password"
              value={inputs.password}
              onChange={(e)=>setInputs({...inputs,password: e.target.value})}
              _placeholder={{ color: 'gray.500' }}
              type="password"
            />
          </FormControl>
          <Stack spacing={6} direction={['column', 'row']}>
            <Button
              bg={'red.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'red.500',
              }}>
              Cancel
            </Button>
            <Button
              bg={'green.400'}
              color={'white'}
              w="full"
              _hover={{
                bg: 'green.500',
              }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    );
  }
export default UpdateProfilePage