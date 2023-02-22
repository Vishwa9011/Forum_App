import React from "react";
import { Heading, Avatar, Box, Image, Flex, Text, Stack, Button, Container, IconButton, useColorModeValue, useDisclosure, StackDivider, } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UserEditModal from "./UserEditModal";
import { Link } from "react-router-dom";

type Props = {};

export default function Profile({ }: Props) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <Container maxW="5xl" mt={10}>
         <Flex gap={6} w="100%">
            <Box w={{ base: "100%", md: "75%" }} bg={useColorModeValue("white", "gray.800")} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
               <Image h={"200px"} w={"full"} src={"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"} objectFit={"cover"} />
               <Flex pl={10} justify={"space-between"}>
                  <Avatar mt={-12} size={"2xl"} name="Ashok Kumar" bg={"blue.500"} src={"#"} css={{ border: "2px solid white", }} />
                  <IconButton mt={2} mr={10} fontSize={"xl"} aria-label="Edit" bg={"#fff"} _hover={{ bg: "blue.500", }}
                     icon={<EditIcon />} onClick={onOpen} />
               </Flex>

               <Box p={4}>
                  <Stack spacing={0} pl={4} align={"flex-start"} mb={5} letterSpacing="1.2px">
                     <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                        Ashok Kumar
                     </Heading>
                     <Text fontSize={"md"} color={"gray.800"}>
                        Full stack web developer
                     </Text>
                     <Text fontSize={"sm"} color={"gray.500"}>
                        ap271449@gmail.com
                     </Text>
                  </Stack>
                  <Stack pl={4} mt="4" direction={"row"}>
                     <Button bg={useColorModeValue("#fff", "gray.900")} color={"black"} border="1px solid grey" rounded={"md"} borderRadius="20px" _hover={{ transform: "translateY(-2px)", boxShadow: "lg", }}>
                        Message
                     </Button>
                     <Button bg={useColorModeValue("blue.500", "gray.900")} color={"white"} rounded={"md"} borderRadius="20px" _hover={{ transform: "translateY(-2px)", boxShadow: "lg", }}>
                        Follow
                     </Button>
                  </Stack>
               </Box>
            </Box>
            <Box w="25%" maxH="100vh" display={{ base: "none", md: "flex" }} bg={useColorModeValue("white", "gray.800")} boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}
               justifyContent="center">
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
                  <Button w="100%" size="xs" border="1px solid blue" borderRadius={"10px"} bg="#fff" _hover={{ transform: "translateY(-2px)", boxShadow: "lg", }}>
                     Sign Out
                  </Button>
               </Stack>
            </Box>
         </Flex>
         <UserEditModal isOpen={isOpen} onClose={onClose} />
      </Container>
   );
}
