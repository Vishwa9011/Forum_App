import React from 'react'
import { useSelector } from "react-redux";
import { Avatar, Box, Button, Divider, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import { RootState } from "../../Redux/store";

const Follower = () => {
    const { userCredential,following } = useSelector((store: RootState) => store.auth);
    console.log(following)
  return (
    <>
        <Box w="70%" m="auto"  boxShadow={"rgba(0, 0, 0, 0.24) 0px 3px 8px"} mt="80px" border={"1px"}
                    borderColor={"gray.400"} borderRadius="10px">
            <Tabs>
            <TabList>
                <Tab fontWeight={"bold"}>Following</Tab>
                <Tab fontWeight={"bold"}>Followers</Tab>
            </TabList>
{/* Following */}
            <TabPanels>
                <TabPanel>
                <Text color={"gray.500"}>You are following 112 people out of your network</Text>
                <Divider/>
                <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                <Box w="30%" display={"flex"}  alignItems={"center"} gap="10px" p="10px" >
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        <Box>
                        <Text fontWeight={"500"}>Saurav Kumar</Text>
                        <Text fontWeight={"400"}>Full Stack Web Developer</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Button>Following</Button>
                    </Box>
                </Box>
                </TabPanel>
{/* Followers */}
                <TabPanel>
                <Text color={"gray.500"}>226 people are following you</Text>
                <Divider/>
                <Box display={"flex"} justifyContent="space-between" alignItems={"center"}>
                <Box w="30%" display={"flex"}  alignItems={"center"} gap="10px" p="10px" >
                        <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
                        <Box>
                        <Text fontWeight={"500"}>Saurav Kumar</Text>
                        <Text fontWeight={"400"}>Full Stack Web Developer</Text>
                        </Box>
                    </Box>
                    <Box>
                        <Button>Follower</Button>
                    </Box>
                </Box>
                </TabPanel>
            </TabPanels>
            </Tabs>
        </Box>
    </>
  )
}

export default Follower