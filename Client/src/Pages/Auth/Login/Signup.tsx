import React, { Dispatch, useState } from "react";
import "./signinpage.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { FcGoogle, FcKey } from "react-icons/fc";
import { GoogleAuth, signup } from "../../../Redux/Auth/auth.actions";
import { useDispatch, useSelector } from "react-redux";
import { UserI } from "../../../Constants/constant";
import UseToastMsg from "../../../Custom-Hooks/Toast";
import { RootState } from "../../../Redux/store";
import { Link, useNavigate } from "react-router-dom";

const initialUserData: UserI = {
  username: "",
  email: "",
  password: "",
};

const Signup = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const [userData, setUserData] = useState(initialUserData);
  const { Toast, Type } = UseToastMsg();
  const { loading } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setUserData({ ...userData, [e.target.name]: val });
  };

  const { username, email, password } = userData;

  const handlesubmit = () => {
    if (!username || !email || !password) {
      return Toast("Please fill all required feilds.", Type.warning);
    }

    if (password.length < 6) {
      return Toast("Password length should be greater than 6", Type.warning);
    }

    dispatch(signup(userData, navigate, Toast));
    setUserData(initialUserData);
  };

  const SignInWithGoogle = () => {
    dispatch(GoogleAuth(navigate, Toast));
  };


  return (
    <>
      <Flex minH={"100vh"} alignItems="center" py={4}>
        <Container maxW="5xl">
          <Flex shadow={"2xl"}>
            <Box id="left" display={{ base: "none", md: "flex" }}>
              <img
                id="img"
                src="https://cdn.pixabay.com/photo/2022/12/10/13/46/attack-7647136_960_720.png"
                alt=""
              />
            </Box>
            <div id="right">
              <Flex
                h="auto"
                align={"center"}
                justify={"center"}
                bg={useColorModeValue("gray.50", "gray.800")}
              >
                <Stack
                  spacing={4}
                  mx={"auto"}
                  maxW={"xl"}
                  py={4}
                  px={6}
                  width="100%"
                >
                  <Stack align={"center"}>
                    <Heading fontSize={"3xl"} textAlign={"center"}>
                      Sign up
                    </Heading>
                    <Text
                      fontSize={"lg"}
                      color={"gray.600"}
                      display={"flex"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      to be a part of forum <FcKey />
                    </Text>
                  </Stack>
                  <Box
                    rounded={"lg"}
                    bg={useColorModeValue("white", "gray.700")}
                    py={4}
                    px={6}
                    width="100%"
                  >
                    <Stack spacing={2}>
                      <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                          type="text"
                          name="username"
                          value={username}
                          onChange={handleChange}
                        />
                      </FormControl>

                      <FormControl id="email" isRequired>
                        <FormLabel>Email address</FormLabel>
                        <Input
                          type="email"
                          name="email"
                          value={email}
                          onChange={handleChange}
                        />
                      </FormControl>
                      <FormControl id="password" isRequired>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                          <Input
                            type={"password"}
                            name="password"
                            value={password}
                            onChange={handleChange}
                          />
                        </InputGroup>
                      </FormControl>
                      <Stack spacing={6} pt={2}>
                        <Button
                          isLoading={loading}
                          loadingText="Registering"
                          size="lg"
                          bg={"blue.400"}
                          color={"white"}
                          _hover={{ bg: "blue.500" }}
                          onClick={handlesubmit}
                        >
                          Sign up
                        </Button>

                        <Button
                          onClick={SignInWithGoogle}
                          loadingText="Submitting"
                          size="lg"
                          bg={"white.400"}
                          color={"black"}
                          border="1px"
                          borderColor={"gray.300"}
                          _hover={{
                            bg: "grey.500",
                            border: "2px solid #4299e1",
                          }}
                        >
                          <FcGoogle style={{ marginRight: "10px" }} /> SignIn
                          with Google
                        </Button>
                      </Stack>
                      <Stack>
                        <Text align={"center"}>
                          Already a user?{" "}
                          <Text as={Link} to="/login" color={"blue.600"} _hover={{ textDecoration: 'underline' }}>
                            Login
                          </Text>
                        </Text>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Flex>
            </div>
          </Flex>
        </Container>
      </Flex >
    </>
  );
};
export default Signup;
