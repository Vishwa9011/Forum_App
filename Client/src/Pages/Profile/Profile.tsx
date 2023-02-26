import React, { useEffect } from "react";
import {
  Heading,
  Avatar,
  Box,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  Container,
  IconButton,
  useColorModeValue,
  useDisclosure,
  StackDivider,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UserEditModal from "./UserEditModal";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Navbar from "../../Components/Navbar/Navbar";
import UseToastMsg from "../../Custom-Hooks/Toast";
import { Dispatch } from "redux";
import { logout } from "../../Redux/Auth/auth.actions";
import UserPost from "./UserPosts";
import useToggle from "../../Custom-Hooks/useToggle";

type Props = {};

export default function Profile({ }: Props) {
  const navigate = useNavigate();
  const { Toast, Type } = UseToastMsg();
  const dispatch: Dispatch<any> = useDispatch();
  const [isOpen, onOpen, onClose]: any = useToggle(false);
  const { userCredential } = useSelector((store: RootState) => store.auth);

  const signout = () => {
    if (!userCredential.email) {
      return Toast("Email is missing", Type.info);
    }
    dispatch(logout(userCredential.email, Toast, navigate));
  };

  return (
    <>
      <Navbar />
      <Container maxW="5xl" mt={10}>
        <Flex gap={6} w="100%">
          <Box w={{ base: "100%", md: "75%" }}>
            <Box bg={useColorModeValue("white", "gray.800")} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
              <Image h={"200px"} w={"full"} src={"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"} objectFit={"cover"} />
              <Flex pl={10} justify={"space-between"}>
                <Avatar mt={-12} size={"2xl"} name={userCredential.username} bg={"blue.500"} src={userCredential.photoURL} css={{ border: "2px solid white" }} />
                <IconButton mt={2} mr={10} fontSize={"xl"} aria-label="Edit" bg={"#fff"} _hover={{ bg: "blue.500" }}
                  icon={<EditIcon />} onClick={onOpen} />
              </Flex>

              <Box p={4}>
                <Stack spacing={0} pl={4} align={"flex-start"} mb={5} letterSpacing="1.2px">
                  <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                    {userCredential.username}
                  </Heading>
                  <Text fontSize={"md"} color={"gray.800"}>
                    {userCredential.bio}
                  </Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {userCredential.email}
                  </Text>
                </Stack>
                <Stack pl={4} mt="4" direction={"row"}>
                  <Button bg={useColorModeValue("#fff", "gray.900")} color={"black"} border="1px solid grey" rounded={"md"} borderRadius="20px" _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}>
                    Message
                  </Button>
                  <Button bg={useColorModeValue("blue.500", "gray.900")} color={"white"} rounded={"md"} borderRadius="20px" _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}>
                    Follow
                  </Button>
                </Stack>
              </Box>
            </Box>
            <UserPost />
          </Box>

          <Box w="25%" maxH="67vh" display={{ base: "none", md: "flex" }} boxShadow={"2xl"}
            rounded={"md"} overflow={"hidden"} justifyContent="center">
            <Stack justify={"center"} divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Account
                </Heading>
                <Flex flexDir={"column"}>
                  <Text as={Link} to="/" pt="2" fontSize="sm">
                    Setting & Privacy
                  </Text>
                  <Text as={Link} to="/" pt="2" fontSize="sm">
                    Help
                  </Text>
                  <Text as={Link} to="/" pt="2" fontSize="sm">
                    Language
                  </Text>
                </Flex>
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Manage
                </Heading>
                <Flex flexDir={"column"}>
                  {" "}
                  <Text as={Link} to="/" pt="2" fontSize="sm">
                    Post & Activity
                  </Text>
                  <Text as={Link} to="/" pt="2" fontSize="sm">
                    Job Posting Account
                  </Text>
                  <Text as={Link} to="/" pt="2" fontSize="sm">
                    Masai School
                  </Text>
                </Flex>
              </Box>
              <Button w="100%" size="xs" border="1px solid blue" borderRadius={"10px"} bg="#fff" _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }} onClick={signout}>
                Sign Out
              </Button>
            </Stack>
          </Box>
        </Flex>
        <UserEditModal isOpen={isOpen} onClose={onClose} />
      </Container>
    </>
  );
}
