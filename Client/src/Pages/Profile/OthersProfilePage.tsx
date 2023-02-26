import React, { useEffect, useMemo, useState } from "react";
import { Heading, Avatar, Box, Image, Flex, Text, Stack, Button, Container, IconButton, StackDivider, Grid, } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import UserEditModal from "./UserEditModal";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import Navbar from "../../Components/Navbar/Navbar";
import UseToastMsg from "../../Custom-Hooks/Toast";
import { Dispatch } from "redux";
import { followUser, logout, unFollowUser } from "../../Redux/Auth/auth.actions";
import useToggle from "../../Custom-Hooks/useToggle";
import axios from "axios";
import { initialUserCredState } from "../../Redux/Auth/auth.reducer";
import { IFollow, IPost, IUser } from "../../Constants/constant";
import UserPostCard from "./UserPostCard";
import { NumberFormat } from "../../helper/helper";

type Props = {};

export default function OthersProfilePage({ }: Props) {
     const { id } = useParams();
     const navigate = useNavigate();
     const { Toast, Type } = UseToastMsg();
     const [profile, setProfile] = useState<IUser>(initialUserCredState);
     const [posts, setPosts] = useState<IPost[]>([]);
     const dispatch: Dispatch<any> = useDispatch();
     const [isOpen, onOpen, onClose]: any = useToggle(false);
     const { userCredential, following } = useSelector((store: RootState) => store.auth);


     const FollowUser = async () => {
          if (!userCredential._id) return navigate("/login");

          const data = {
               userID: userCredential._id,
               followingID: profile._id,
          };
          console.log("data: ", data);
          dispatch(followUser(data, Toast, fetchUser));
     };

     const UnFollowUser = async () => {
          if (!userCredential._id) return navigate("/login");

          const data = {
               userID: userCredential._id,
               followingID: profile._id,
          };
          console.log("data: ", data);
          dispatch(unFollowUser(data, Toast, fetchUser));
     };

     const FollowingGroup = useMemo(() => {
          if (!following) return;
          const group: any = {};
          following.forEach((check: IFollow) => {
               group[check.followingID] = check;
          });
          return group
     }, [following])

     const IsFollowing = (id: string) => {
          return FollowingGroup[id] == undefined
     }

     const fetchUser = async () => {
          try {
               const profile = await axios.get(`/user/${id}`);
               console.log('profile: ', profile);
               setProfile(profile.data.credentials);
          } catch (error) {
               console.log('error: ', error);
          }
     }

     const fetchPost = async () => {
          try {
               const posts = await axios.get(`/post/all/${id}`);
               setPosts(posts.data.posts);
          } catch (error) {
               console.log('error: ', error);
          }
     }

     useEffect(() => {
          fetchUser();
          fetchPost()
     }, [])

     return (
          <>
               <Navbar />
               <Box maxW="100%" mt={10} mx='auto'>
                    <Flex gap={6} w="100%">
                         <Box w={{ base: "100%", md: "75%" }} m='auto'>
                              <Box boxShadow={"2xl"} rounded={"md"} overflow={"hidden"}>
                                   <Image h={"200px"} w={"full"} src={"https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"} objectFit={"cover"} />
                                   <Flex pl={10} justify={"space-between"}>
                                        <Avatar mt={-12} size={"2xl"} name={profile?.username} bg={"blue.500"} src={profile?.photoURL} css={{ border: "2px solid white" }} />
                                   </Flex>

                                   <Box p={4}>
                                        <Stack spacing={0} pl={4} align={"flex-start"} mb={5} letterSpacing="1.2px">
                                             <Flex align={'center'} gap='5'>
                                                  <Heading whiteSpace={'nowrap'} fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                                                       {profile?.username}
                                                  </Heading>
                                                  {profile.online ?
                                                       <Box w="100%" color={'green'} display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px" mt="10px">
                                                            <Box bg="green" borderRadius={"50%"} h="7px" w="7px"></Box>
                                                            <Text fontWeight={"500"}>Online</Text>
                                                       </Box>
                                                       :
                                                       <Box w="100%" color={'gray'} display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px">
                                                            <Box bg="gray" borderRadius={"50%"} h="7px" w="7px"></Box>
                                                            <Text fontWeight={"500"}>Offline</Text>
                                                       </Box>}
                                             </Flex>
                                             <Text fontSize={"md"} color={"gray.800"}>
                                                  {profile?.bio}
                                             </Text>
                                             <Text fontSize={"sm"} color={"gray.500"}>
                                                  {profile?.email}
                                             </Text>
                                        </Stack>
                                        <Stack pl={4} mt="2" direction={"row"} fontSize='.9em'>
                                             <Text as={Link} to='/' _hover={{ textDecoration: "underline" }} fontWeight='semibold' color={'blue.500'}>
                                                  {NumberFormat(profile.followerCount)} Followers
                                             </Text>
                                             <Text as={Link} to='/' _hover={{ textDecoration: "underline" }} fontWeight='semibold' color={'blue.500'}>
                                                  {NumberFormat(profile.followingCount)} Following
                                             </Text>
                                        </Stack>
                                        <Stack pl={4} mt="4" direction={"row"}>
                                             <Button as={Link} to={`mailto:${profile.email}`} color={"black"} border="1px solid grey" rounded={"md"} borderRadius="20px" _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}>
                                                  Message
                                             </Button>
                                             {userCredential._id != profile._id && <Button onClick={IsFollowing(profile._id) ? FollowUser : UnFollowUser} color={"white"} rounded={"md"} borderRadius="20px" _hover={{ transform: "translateY(-2px)", boxShadow: "lg" }}>
                                                  {IsFollowing(profile._id) ? "Follow" : "Unfollow"}
                                             </Button>}
                                        </Stack>
                                   </Box>
                              </Box>
                              <Grid my={"40px"} gap={"20px"} gridTemplateColumns={{ base: `repeat(2, 1fr)`, md: "repeat(3, 1fr)", lg: "repeat(3, 1fr)", }}
                                   cursor="pointer">
                                   {posts.map((post: IPost) => {
                                        return (
                                             <Box key={post._id} minH='100%' h='full' overflow={'hidden'}>
                                                  <UserPostCard post={post} />
                                             </Box>
                                        );
                                   })}
                              </Grid>
                         </Box>
                    </Flex>
               </Box>
          </>
     );
}
