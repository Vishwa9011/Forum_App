import React, { Dispatch, useState } from "react";
import "./signinpage.css";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
  RadioGroup,
  Radio,
  Container,
} from "@chakra-ui/react";
import { FcGoogle, FcKey } from "react-icons/fc";
import { GoogleAuth, signup } from "../../../Redux/Auth/auth.actions";
import { useDispatch } from "react-redux";
import { UserI } from "../../../Constants/constant";

const initialUserData: UserI = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const [userData, setUserData] = useState(initialUserData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setUserData({ ...userData, [e.target.name]: val });
  };

  const handlesubmit = () => {
    dispatch(signup(userData));
  };

  const { name, email, password } = userData;

  return (
    <Container maxW="5xl">
      {/* <div>Signup</div> */}

      <Box id="main" shadow={"2xl"}>
        <div id="left">
          <img
            id="img"
            src="https://cdn.pixabay.com/photo/2022/12/10/13/46/attack-7647136_960_720.png"
            alt=""
          />
        </div>
        <div id="right">
          <Flex
            minH={"100vh"}
            align={"center"}
            justify={"center"}
            bg={useColorModeValue("gray.50", "gray.800")}
          >
            <Stack
              spacing={8}
              mx={"auto"}
              maxW={"xl"}
              py={12}
              px={6}
              width="100%"
            >
              <Stack align={"center"}>
                <Heading fontSize={"4xl"} textAlign={"center"}>
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
                p={8}
                width="100%"
              >
                <Stack spacing={4}>
                  <FormControl id="firstName" isRequired>
                    <FormLabel>Name</FormLabel>
                    <Input
                      type="text"
                      name="name"
                      value={name}
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
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={password}
                        onChange={handleChange}
                      />
                    </InputGroup>
                  </FormControl>
                  <Stack spacing={10} pt={2}>
                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{ bg: "blue.500" }}
                      onClick={handlesubmit}
                    >
                      Sign up
                    </Button>

                    <Button
                      loadingText="Submitting"
                      size="lg"
                      bg={"white.400"}
                      color={"black"}
                      border="1px"
                      borderColor={"gray.300"}
                      _hover={{ bg: "grey.500", border: "2px solid #4299e1" }}
                    >
                      <FcGoogle style={{ marginRight: "10px" }} /> SignIn with
                      Google
                    </Button>
                  </Stack>
                  <Stack pt={6}>
                    <Text align={"center"}>
                      Already a user? <Link color={"blue.400"}>Login</Link>
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Stack>
          </Flex>
        </div>
      </Box>
    </Container>
  );
};

export default Signup;
