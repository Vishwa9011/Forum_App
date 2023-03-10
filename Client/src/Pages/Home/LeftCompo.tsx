import React from 'react'
import { Avatar, Box, Button, Card, CardBody, Divider, Heading, Image, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FcBriefcase, FcBookmark, FcComments } from "react-icons/fc";

const LeftCompo = () => {
    const { userCredential } = useSelector((store: RootState) => store.auth);

    return (
        <>
            <Box >
                <Card h="max-content" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mt="20px" border={"1px"}
                    borderColor={"gray.400"}>
                    <CardBody>
                        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                            <Avatar bg="purple.400" color='blackAlpha.800' boxSize='45px' name={userCredential.username} src={userCredential.photoURL || "https://bit.ly/3kkJrly"} />
                        </Box>
                        {userCredential.online ?
                            <Box w="100%" color={'green'} display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px" mt="10px">
                                <Box bg="green" borderRadius={"50%"} h="7px" w="7px"></Box>
                                <Text fontWeight={"500"}>Online</Text>
                            </Box>
                            :
                            <Box color={'gray'} display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px" mt="10px">
                                <Box bg="gray" borderRadius={"50%"} h="7px" w="7px"></Box>
                                <Text fontWeight={"500"}>Offline</Text>
                            </Box>}
                        <Stack mt='6' spacing='3'>
                            <Divider />
                            <Text size='md' textAlign={"center"} fontWeight="bold">{userCredential.username.toUpperCase() || "Fast space for connection"}</Text>
                            <Text textAlign={"center"} color={"#666666"} _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                                {userCredential.email || "Get full Premium insight"}
                            </Text>
                            <Divider />
                            <Text color='blue.600' textAlign={"center"} fontSize="12px" _hover={{ textDecoration: "underline", cursor: "pointer" }}>
                                {userCredential.bio || "Access exclusive tools & insights"}
                            </Text>
                            <Button display={"flex"} justifyContent="center" alignItems={"center"}><FcBriefcase fontSize={"20px"} />{" "}Try Premium for free</Button>
                            <Divider />
                            <Button display={"flex"} justifyContent="center" alignItems={"center"}><FcBookmark /> My Items</Button>
                        </Stack>
                    </CardBody>

                </Card>
                <Card h="max-content" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} border={"1px"}
                    borderColor={"gray.400"} mt="20px">
                    <CardBody>
                        <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                            <Heading>Groups</Heading>
                        </Box>
                        <Divider />
                        <Divider />
                        <Stack mt='6' spacing='3'>
                            <UnorderedList>
                                <ListItem listStyleType={"circle"} fontWeight="500">Flexto.io</ListItem>
                                <ListItem listStyleType={"circle"} fontWeight="500">Cloud Consultant At Google</ListItem>
                                <ListItem listStyleType={"circle"} fontWeight="500">Crio.Do</ListItem>
                                <ListItem listStyleType={"circle"} fontWeight="500">JavaScript Developer</ListItem>
                            </UnorderedList>
                            <Divider />
                            <Box color='blue.600' fontSize='1xl' display={"flex"} justifyContent="flex-start" alignItems={"center"} >
                                <ul>
                                    <li><Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>Tags</Text></li>
                                    <li><Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>Connections</Text></li>
                                </ul>
                            </Box>
                            <Divider />
                        </Stack>
                    </CardBody>
                </Card>
            </Box>
        </>
    )
}

export default LeftCompo