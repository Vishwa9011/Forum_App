import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, Divider, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { RootState } from "../../Redux/store";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar';

const Follow = () => {
    const { id } = useParams()
    const { userCredential, } = useSelector((store: RootState) => store.auth);
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])

    const fetchFollow = async () => {
        const response = await axios.get(`/user/${id}/follow/all`);
        setFollowers(response.data.followers);
        setFollowing(response.data.following);
    }

    useEffect(() => {
        fetchFollow()
    }, [])

    return (
        <>
            <Navbar />
            <Box w="70%" m="auto" boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mt="80px" border={"1px"}
                borderColor={"gray.400"} borderRadius="10px">
                <Tabs>
                    <TabList>
                        <Tab fontWeight={"bold"}>Following</Tab>
                        <Tab fontWeight={"bold"}>Followers</Tab>
                    </TabList>
                    {/* Following */}
                    <TabPanels>
                        <TabPanel>
                            <Text color={"gray.500"}>You are following {following.length} people out of your network</Text>
                            <Divider />
                            {following && following.map((Following: any) => (
                                <Box key={Following._id} display={"flex"} w='100%' justifyContent="space-between" alignItems={"center"}>
                                    <Flex w='100%' alignItems={"center"} gap="10px" p="10px" >
                                        <Avatar as={Link} to={`/user/${Following?.followingID._id}`} name='Dan Abrahmov' src={Following?.followingID?.photoURL || 'https://bit.ly/dan-abramov'} />
                                        <Box as={Link} to={`/user/${Following?.followingID._id}`}>
                                            <Text textTransform={"capitalize"} fontWeight={"500"}>{Following?.followingID?.username}</Text>
                                            <Text textTransform={"capitalize"} fontWeight={"400"}>{Following?.followingID?.bio || Following?.followingID?.email}</Text>
                                        </Box>
                                        <Box ml='auto'>
                                            <Button bg='blue.300' colorScheme={'blue.300'} _hover={{ bg: "blue.500" }} color={'white'} as={Link} to={`/user/${Following?.followingID._id}`}>See Profile</Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            ))}
                        </TabPanel>

                        {/* Followers */}

                        <TabPanel>
                            <Text color={"gray.500"}>{followers.length} people are following you</Text>
                            <Divider />
                            {followers && followers.map((follower: any) => (
                                <Box key={follower._id} display={"flex"} w='100%' justifyContent="space-between" alignItems={"center"}>
                                    <Flex w='100%' alignItems={"center"} gap="10px" p="10px" >
                                        <Avatar as={Link} to={`/user/${follower?.userID?._id}`} name='Dan Abrahmov' src={follower?.userID?.photoURL || 'https://bit.ly/dan-abramov'} />
                                        <Box as={Link} to={`/user/${follower?.userID?._id}`}>
                                            <Text textTransform={"capitalize"} fontWeight={"500"}>{follower?.userID?.username}</Text>
                                            <Text textTransform={"capitalize"} fontWeight={"400"}>{follower?.userID?.bio || follower?.userID?.email}</Text>
                                        </Box>
                                        <Box ml='auto'>
                                            <Button bg='blue.300' colorScheme={'blue.300'} _hover={{ bg: "blue.500" }} color={'white'} as={Link} to={`/user/${follower?.userID?._id}`}>See Profile</Button>
                                        </Box>
                                    </Flex>
                                </Box>
                            ))}
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    )
}

export default Follow;