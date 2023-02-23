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
  useToast,
} from "@chakra-ui/react";
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
<<<<<<< HEAD
	const [showPassword, setShowPassword] = useState(false);
	const [value, setValue] = React.useState('1')
	const dispatch: Dispatch<any> = useDispatch();
	// const [firstname,setFirstname] = React.useState()
=======
  const [showPassword, setShowPassword] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const [userData, setUserData] = useState(initialUserData);
  const { Toast, Type } = UseToastMsg();
  const { loading } = useSelector((store: RootState) => store.auth);
  const navigate = useNavigate();
>>>>>>> 4c1834cab8f29bae74ea5f79e5ba6fa865b3b589

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setUserData({ ...userData, [e.target.name]: val });
  };

  const { username, email, password } = userData;

<<<<<<< HEAD
	}
	const handleGoogle = () => {
		console.log("hi");

		dispatch(GoogleAuth());
	}

	return (
		<>
			{/* <div>Signup</div> */}
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
=======
  const handlesubmit = () => {
    if (!username || !email || !password) {
      return Toast("Please fill all required feilds.", Type.info);
    }
    if (password.length <= 8) {
      return Toast("Password length should be greater than 8", Type.error);
    }
    dispatch(signup(userData, navigate, Toast));
    setUserData(initialUserData);
  };

  return (
    <Box maxH={"100vh"}>
      <Container maxW="5xl">
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
              maxH={"100vh"}
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
                          type={showPassword ? "text" : "password"}
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
                    <Stack>
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
    </Box>
  );
>>>>>>> 4c1834cab8f29bae74ea5f79e5ba6fa865b3b589
};

export default Signup;
