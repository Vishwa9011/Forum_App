import React from 'react'
import { Avatar, Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, List, ListIcon, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { FcBriefcase,FcBookmark,FcComments } from "react-icons/fc";
import { MdCheckCircle } from "react-icons/md";

const LeftCompo = () => {
    const { posts } = useSelector((store: RootState) => store.post);
    const { userCredential } = useSelector((store: RootState) => store.auth);
  return (
    <>
        <Box display={{base:"none",sm:"none",md:"none",lg:"block"}}>
        <Card h="max-content" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mt="20px" border={"1px"}
      borderColor={"gray.400"}>
            <CardBody>
                 <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                <Avatar size='1xl' name='Segun Adebayo' src={userCredential.photoURL || "https://bit.ly/3kkJrly"} />
                </Box> 
                
                {userCredential.online ? <Text w="100%" display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px" mt="10px">
                 <Box bg="green" borderRadius={"50%"} h="7px" w="7px">
                </Box>
                <Text fontWeight={"500"}>Online</Text> 
                </Text> : <Text w="100%" display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px">
                 <Box bg="red" borderRadius={"50%"} h="7px" w="7px">
                </Box>
                <Text fontWeight={"500"}>Not Available</Text> 
                </Text>}
                <Stack mt='6' spacing='3'>
                <Divider/>
                <Text size='md' textAlign={"center"} fontWeight="bold">{userCredential.username.toUpperCase() || "Fast space for connection"}</Text>
                <Text textAlign={"center"} color={"#666666"} _hover={{textDecoration:"underline",cursor:"pointer"}}>
                    {userCredential.email || "Get full Premium insight"}
                </Text>
                <Divider/>
                <Text color='blue.600' textAlign={"center"} fontSize="12px" _hover={{textDecoration:"underline",cursor:"pointer"}}>
                    {userCredential.bio || "Access exclusive tools & insights"}
                </Text>
                <Button display={"flex"} justifyContent="center" alignItems={"center"}><FcBriefcase fontSize={"20px"}/>{" "}Try Premium for free</Button>
                <Divider/>
                <Button display={"flex"} justifyContent="center" alignItems={"center"}><FcBookmark/> My Items</Button>
                </Stack>
            </CardBody>
            
            </Card>
            <Card h="max-content" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"}  border={"1px"}
      borderColor={"gray.400"} mt="20px">
            <CardBody>
                <Box display={"flex"} justifyContent="center" alignItems={"center"}>
                    <Heading>Groups</Heading>
                    {/* <List spacing={3}>
                    <ListItem>
                    <ListIcon as={MdCheckCircle} color='#2196f3' fontSize={"2xl"} display={"flex"} justifyContent="space-between" alignItems={"center"}/>
                    </ListItem>
                    </List> */}
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
                <Text color='blue.600' fontSize='1xl' display={"flex"} justifyContent="flex-start" alignItems={"center"} >
                    <ul>
                        <li><Text _hover={{textDecoration:"underline",cursor:"pointer"}}>Tags</Text></li>
                        <li><Text _hover={{textDecoration:"underline",cursor:"pointer"}}>Connections</Text></li>
                    </ul>
                </Text>
                <Divider />
                </Stack>
            </CardBody>
            </Card>
            </Box>
    </>
  )
}

export default LeftCompo