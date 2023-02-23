import React, { Dispatch, useState } from "react";
import "./signinpage.css";
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, Stack, Button, Heading, Text, useColorModeValue, Link, RadioGroup, Radio, Container, } from "@chakra-ui/react";
import { FcGoogle, FcKey } from "react-icons/fc";
import { GoogleAuth, signup } from "../../../Redux/Auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { UserI } from "../../../Constants/constant";
import UseToastMsg from "../../../Custom-Hooks/Toast";
import { RootState } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";

const initialUserData: UserI = {
     username: "",
     email: "",
     password: "",
};

const Signup = () => {
     const [value, setValue] = React.useState('1')
     const [showPassword, setShowPassword] = useState(false);
     const dispatch: Dispatch<any> = useDispatch();
     const [userData, setUserData] = useState(initialUserData);
     const { Toast, Type } = UseToastMsg();
     const { loading } = useSelector((store: RootState) => store.auth);
     const navigate = useNavigate();

     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          let val = e.target.value;
          setUserData({ ...userData, [e.target.name]: val });
     };



     const handlesubmit = () => {
          const { username, email, password } = userData;

          if (!username || !email || !password) {
               return Toast("Please fill all required feilds.", Type.info);
          }

          if (password.length <= 6) {
               return Toast("Password length should be greater than 8", Type.error);
          }
          dispatch(signup(userData, navigate, Toast));
          setUserData(initialUserData);
     }

     const handleGoogle = () => {
          console.log("hi");

          dispatch(GoogleAuth());
     }

     return (
          <>
               <div id="main">
                    <div id="left">
                         <img id="img" src="https://cdn.pixabay.com/photo/2022/12/10/13/46/attack-7647136_960_720.png" alt="" />
                    </div>
                    <div id="right">
                         <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
                              <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                                   <Stack align={'center'}>
                                        <Heading fontSize={'4xl'} textAlign={'center'}>
                                             Sign up
                                        </Heading>
                                        <Text fontSize={'lg'} color={'gray.600'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                             to be a part of forum <FcKey />
                                        </Text>
                                   </Stack>
                                   <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
                                        <Stack spacing={4}>
                                             <HStack>
                                                  <Box>
                                                       <FormControl id="firstName" isRequired>
                                                            <FormLabel>First Name</FormLabel>
                                                            <Input type="text" />
                                                       </FormControl>
                                                  </Box>
                                                  <Box>
                                                       <FormControl id="lastName">
                                                            <FormLabel>Last Name</FormLabel>
                                                            <Input type="text" />
                                                       </FormControl>
                                                  </Box>
                                             </HStack>
                                             <FormControl id="email" isRequired>
                                                  <FormLabel>Email address</FormLabel>
                                                  <Input type="email" />
                                             </FormControl>
                                             <FormControl id="password" isRequired>
                                                  <FormLabel>Password</FormLabel>
                                                  <InputGroup>
                                                       <Input type={'password'} />
                                                  </InputGroup>
                                             </FormControl>
                                             <Stack spacing={10} pt={2}>
                                                  <Button loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} onClick={handlesubmit}>
                                                       Sign up
                                                  </Button>

                                                  <Button loadingText="Submitting" size="lg" bg={'white.400'} color={'black'} border="1px" borderColor={"gray.300"} _hover={{ bg: 'grey.500', border: "2px solid #4299e1" }} onClick={handleGoogle}>
                                                       <FcGoogle style={{ marginRight: "10px" }} /> SignIn with Google
                                                  </Button>
                                             </Stack>
                                             <Stack pt={6}>
                                                  <Text align={'center'}>
                                                       Already a user? <Link color={'blue.400'}>Login</Link>
                                                  </Text>
                                             </Stack>
                                        </Stack>
                                   </Box>
                              </Stack>
                         </Flex>
                    </div>
               </div>
          </>
     );
}
export default Signup;