import React,{useState} from "react";
import "./signinpage.css";
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    HStack,
    InputRightElement,
    Stack,
    Button,
    Heading,
    Checkbox,
    Text,
    useColorModeValue,
    Link,
} from "@chakra-ui/react";
import { FcSmartphoneTablet,FcGoogle } from "react-icons/fc";
const Loginpage = () => {
    
  return (
    <>
      <div id="main">
        <div id="left">
          <img
            id="img"
            src="https://cdn.pixabay.com/photo/2017/05/14/03/45/data-2311261__340.png"
            alt=""
          />
        </div>
        <div id="right">
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={10} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                <Heading fontSize={'4xl'}>LogIn</Heading>
                <Text fontSize={'lg'} color={'gray.600'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    to enjoy forum <FcSmartphoneTablet style={{marginLeft:"10px"}}/>
                </Text>
                </Stack>
                <Box
                rounded={'lg'}
                bg={useColorModeValue('white', 'gray.700')}
                boxShadow={'lg'}
                p={10}>
                <Stack spacing={4}>
                    <FormControl id="email">
                    <FormLabel>Email address</FormLabel>
                    <Input type="email" />
                    </FormControl>
                    <FormControl id="password">
                    <FormLabel>Password</FormLabel>
                    <Input type="password" />
                    </FormControl>
                    <Stack spacing={10}>
                    <Stack
                        direction={{ base: 'column', sm: 'row' }}
                        align={'start'}
                        justify={'space-between'}>
                        <Checkbox>Remember me</Checkbox>
                        <Link color={'blue.400'}>Forgot password?</Link>
                    </Stack>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        _hover={{
                        bg: 'blue.500',
                        }}>
                        Sign in
                    </Button>
                    <Button
                        loadingText="Submitting"
                        size="lg"
                        bg={'white.400'}
                        color={'black'}
                        border= "1px"
                        borderColor={"gray.300"}
                        _hover={{
                        bg: 'grey.500', border: "2px solid #4299e1"
                        }}>
                        <FcGoogle style={{marginRight:"10px"}}/> SgnIn with Google
                    </Button>
                    </Stack>
                </Stack>
                </Box>
            </Stack>
            </Flex>
        </div>
      </div>
    </>
  );
};

export default Loginpage;
