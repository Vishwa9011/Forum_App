import { Box, Button, Flex, Grid, Image, useDisclosure } from '@chakra-ui/react'
import React, { useEffect, useState, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import PostCard from '../../Components/Cards/PostCards/PostCard'
import { IFollow, ILikes, IPost } from '../../Constants/constant';
import useToggle from '../../Custom-Hooks/useToggle';
import { getAllPost } from '../../Redux/Post/post.actions';
import { RootState } from '../../Redux/store';
import Createpost from './Createpost';
import UpdatePost from './UpdatePost';

function Post() {
     const navigate = useNavigate()
     const dispatch: Dispatch<any> = useDispatch()
     const { posts, likes } = useSelector((store: RootState) => store.post);
     const { userCredential, following } = useSelector((store: RootState) => store.auth);
     const [isOpen, onOpen, onClose]: any = useToggle(false)

     const GroupLikedPost = useMemo(() => {
          if (!likes) return;
          const group: any = {};
          likes.forEach((check: ILikes) => {
               group[check.authorID] = check;
          });
          return group;
     }, [likes])

     const isLikedPost = (id: string) => {
          return GroupLikedPost[id] != undefined
     }

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

     function openCreatePost() {
          if (!userCredential._id) {
               return navigate("/login")
          }
          onOpen()
     }

     useEffect(() => {
          dispatch(getAllPost())
     }, [])

     return (
          <Box>
               <Grid maxW={"500px"} w='500px' m='auto'>
                    <Box>
                         <Flex p='2' my='5' gap='20px' justify={'space-between'} border='1px' borderColor={'gray.400'} borderRadius={'5px'}>
                              <Box className='create-post-image'>
                                   <Image src={userCredential.photoURL || "https://bit.ly/3kkJrly"} />
                              </Box>
                              <Button variant={'outline'} w='100%' borderRadius={'10px'} onClick={openCreatePost} color={''}>Create Post</Button>
                         </Flex>

                         {isOpen && <Createpost onClose={onClose} />}

                    </Box>
                    <Grid gap='10px' minH='fit-content'>
                         {posts.map((post: IPost) => {
                              return <PostCard post={post} key={post._id} IsLikedPost={isLikedPost(post.authorID)} IsFollowing={IsFollowing(post.authorID)} />
                         })}
                    </Grid>
               </Grid>
          </Box >
     )
}

export default Post;
