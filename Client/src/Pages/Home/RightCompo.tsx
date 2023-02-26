import React from 'react'
import { Box, Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Image, List, ListIcon, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import { FcInfo, FcOk } from "react-icons/fc";
import { MdCheckCircle } from "react-icons/md";

const RightCompo = () => {
    return (
        <>
            <Box display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
                <Card h="max-content" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} border={"1px"}
                    borderColor={"gray.400"} mt="20px" >
                    <CardBody>
                        <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                            <Heading>Forum News</Heading>
                            <List spacing={3}>
                                <ListItem>
                                    <ListIcon as={MdCheckCircle} color='#2196f3' fontSize={"3xl"} display={"flex"} justifyContent="center" alignItems={"center"} />
                                </ListItem>
                            </List>
                        </Box>
                        <Divider />
                        <Stack mt='6' spacing='3'>
                            <UnorderedList>
                                <ListItem listStyleType={"circle"} fontWeight="500">Python Web Developer</ListItem>
                                <ListItem listStyleType={"circle"} fontWeight="500">AutomobileJob.com</ListItem>
                                <ListItem listStyleType={"circle"} fontWeight="500">Microsoft partnership with Forum</ListItem>
                                <ListItem listStyleType={"circle"} fontWeight="500">Dev OPs works</ListItem>
                            </UnorderedList>
                            <Divider />
                            <Box color='blue.600' fontSize='1xl' display={"flex"} justifyContent="flex-start" alignItems={"center"} >
                                <ul>
                                    <li><Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>Followed Hashtag</Text></li>
                                    <li><Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>Events</Text></li>
                                </ul>
                            </Box>
                            <Divider />
                        </Stack>
                    </CardBody>
                </Card>
                <Card h="max-content" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} border={"1px"}
                    borderColor={"gray.400"} mt="20px">
                    <CardBody>
                        <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                            <Heading>Forum Upadtes</Heading>
                        </Box>
                        <Divider />
                        <Divider />
                        <Stack mt='6' spacing='3'>
                            <Text fontWeight={"bold"}>Recent</Text>
                            <UnorderedList>
                                <ListItem color={"#666666"} fontWeight="500">Funding and founding India's unicorns.</ListItem>
                                <ListItem color={"#666666"} fontWeight="500">Millennials no more 'rent generation'.</ListItem>
                                <ListItem color={"#666666"} fontWeight="500">Wipro pay row: Experts weigh in.</ListItem>
                                <ListItem color={"#666666"} fontWeight="500">A fast climb for office spaces.</ListItem>
                            </UnorderedList>
                            <Divider />
                            <Box color='blue.600' fontSize='1xl' display={"flex"} justifyContent="flex-start" alignItems={"center"} >
                                <ul>
                                    <li><Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>Fork</Text></li>
                                    <li><Text _hover={{ textDecoration: "underline", cursor: "pointer" }}>Event</Text></li>
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

export default RightCompo