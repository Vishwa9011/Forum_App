import React, { useState } from "react";
import "./signinpage.css";
import { login } from "../../../Redux/Auth/auth.actions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
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
	Container,
} from "@chakra-ui/react";
import { FcSmartphoneTablet, FcGoogle } from "react-icons/fc";
import UseToastMsg from "../../../Custom-Hooks/Toast";
import { useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import { useNavigate, Link } from "react-router-dom";
import { GoogleAuth } from "../../../Redux/Auth/auth.actions";
import Navbar from "../../../Components/Navbar/Navbar";

interface ILoginCred {
	email: string;
	password: string;
}

const initialUserData: ILoginCred = {
	email: "",
	password: "",
};

const Login = () => {
	const { Toast } = UseToastMsg();
	const navigate = useNavigate();
	const dispatch: Dispatch<any> = useDispatch();
	const [userData, setUserData] = useState(initialUserData);
	const { loading } = useSelector((store: RootState) => store.auth);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;
		setUserData({ ...userData, [e.target.name]: val });
	};


	const { email, password } = userData;

	const handleSubmit = () => {
		if (!email && !password) {
			return Toast("Please fill the required login feilds", "warning");
		}

		dispatch(login(email, password, navigate, Toast));
		setUserData(initialUserData);
	};

	const SignInWithGoogle = () => {
		dispatch(GoogleAuth(navigate, Toast));
	};

	return (
		<>
			<Navbar />
			<Box minH={"100vh"} display="grid" justifyContent={"center"} alignItems="center" >
				<Container maxW="5xl">
					<Box id="main" shadow={"2xl"} >
						<Box id="left" display={{ base: "none", md: "flex" }}>
							<img
								id="img"
								src="https://cdn.pixabay.com/photo/2021/08/25/12/45/phishing-6573326_960_720.png"
								alt=""
							/>
						</Box>
						<div id="right">
							<Flex
								// maxH={"100vh"}
								align={"center"}
								justify={"center"}
								bg={useColorModeValue("gray.50", "gray.800")}
							>
								<Stack spacing={4} mx={"auto"} maxW={"xl"} px={6} py={4} width={"100%"}>
									<Stack align={"center"}>
										<Heading fontSize={"3xl"} textAlign={"center"}>Login</Heading>
										<Text
											fontSize={"lg"}
											color={"gray.600"}
											display={"flex"}
											justifyContent={"center"}
											alignItems={"center"}
										>
											to enjoy forum{" "}
											<FcSmartphoneTablet style={{ marginLeft: "10px" }} />
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
											<FormControl id="email">
												<FormLabel>Email address</FormLabel>
												<Input
													type="email"
													name="email"
													value={email}
													onChange={handleChange}
												/>
											</FormControl>
											<FormControl id="password">
												<FormLabel>Password</FormLabel>
												<Input
													type="password"
													name="password"
													value={password}
													onChange={handleChange}
												/>
											</FormControl>
											<Stack spacing={6}>
												<Stack
													direction={{ base: "column", sm: "row" }}
													align={"start"}
													justify={"space-between"}
												>
													<Checkbox>Remember me</Checkbox>
													<Text color={"blue.400"}>Forgot password?</Text>
												</Stack>
												<Button
													isLoading={loading}
													bg={"blue.400"}
													color={"white"}
													_hover={{ bg: "blue.500" }}
													onClick={handleSubmit}
												>
													Sign in
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
												<div style={{ textAlign: "center" }}>
													<Text>
														New User?{" "}
														<Text as={Link}
															to={"/signup"}
															color={"blue.600"} _hover={{ textDecoration: 'underline' }}
														>
															Create a new account
														</Text>
													</Text>
												</div>
											</Stack>
										</Stack>
									</Box>
								</Stack>
							</Flex>
						</div>
					</Box>
				</Container>
			</Box>
		</>
	);

};

export default Login;
