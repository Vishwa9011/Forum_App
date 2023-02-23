import React, { useState } from "react";
import "./signinpage.css";
import { login } from "../../../Redux/Auth/auth.actions";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Checkbox, Text, useColorModeValue, Link, } from "@chakra-ui/react";
import { FcSmartphoneTablet, FcGoogle } from "react-icons/fc";
import UseToastMsg from "../../../Custom-Hooks/Toast";
import { useNavigate } from "react-router-dom";
import { GoogleAuth } from './../../../Redux/Auth/auth.actions';

interface ILoginCred {
	email: string
	password: string
}

const initialUserData: ILoginCred = {
	email: "",
	password: ""
};

const Login = () => {
	const { Toast } = UseToastMsg()
	const navigate = useNavigate();
	const dispatch: Dispatch<any> = useDispatch();
	const [userData, setUserData] = useState(initialUserData);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		let val = e.target.value;
		setUserData({ ...userData, [e.target.name]: val });
	}

	const { email, password } = userData;

	const handleSubmit = () => {

		if (!email || !password) {
			return alert("Please fill the required")
		}

		dispatch(login(email, password, navigate, Toast));
		setUserData(initialUserData);
	}

	const SignInWithGoogle = () => {
		dispatch(GoogleAuth(navigate, Toast))
	}

	return (
		<>
			<Box id="main" p='40px'>
				<Box id="left" minH='100%'>
					<img id="img" src="https://cdn.pixabay.com/photo/2017/05/14/03/45/data-2311261__340.png" alt="" />
				</Box>
				<Box id="right" minH='100%'>
					<Flex minW='450px' align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
						<Stack spacing={10} mx={'auto'} maxW={'100%'} px={6}>
							<Stack align={'center'}>
								<Heading fontSize={'4xl'}>LogIn</Heading>
								<Text fontSize={'lg'} color={'gray.600'} display={"flex"} justifyContent={"center"} alignItems={"center"}>
									to enjoy forum <FcSmartphoneTablet style={{ marginLeft: "10px" }} />
								</Text>
							</Stack>
							<Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={10}>
								<Stack spacing={4}>
									<FormControl id="email">
										<FormLabel>Email address</FormLabel>
										<Input type="email" name="email" value={email} onChange={handleChange} />
									</FormControl>
									<FormControl id="password">
										<FormLabel>Password</FormLabel>
										<Input type="password" name="password" value={password} onChange={handleChange} />
									</FormControl>
									<Stack spacing={10}>
										<Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
											<Checkbox>Remember me</Checkbox>
											<Link color={'blue.400'}>Forgot password?</Link>
										</Stack>
										<Button bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }} onClick={handleSubmit}>
											Sign in
										</Button>
										<Button onClick={SignInWithGoogle} loadingText="Submitting" size="lg" bg={'white.400'} color={'black'} border="1px" borderColor={"gray.300"} _hover={{ bg: 'grey.500', border: "2px solid #4299e1" }}>
											<FcGoogle style={{ marginRight: "10px" }} /> SgnIn with Google
										</Button>
									</Stack>
								</Stack>
							</Box>
						</Stack>
					</Flex>
				</Box>
			</Box>
		</>
	);
};

export default Login;
