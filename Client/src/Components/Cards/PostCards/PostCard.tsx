import { Box, Button, Flex, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { BiCommentDots, BiLike } from 'react-icons/bi'
import { AiFillLike } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { IFollow, ILikes, IPost } from '../../../Constants/constant'
import CommentsList from '../Comments/CommentsList';
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, deletePost, getComments, likePost, unLikePost } from '../../../Redux/Post/post.actions'
import { RootState } from '../../../Redux/store'
import CommentForm from '../Comments/CommentForm'
import { dateFormatter } from '../../../helper/helper'
import UpdatePost from '../../../Pages/Post/UpdatePost'
import './PostCard.css'
import { Link, useNavigate } from 'react-router-dom'
import { followUser, unFollowUser } from '../../../Redux/Auth/auth.actions'
import UseToastMsg from '../../../Custom-Hooks/Toast'
import useToggle from '../../../Custom-Hooks/useToggle'

type Props = {
     post: IPost,
     IsLikedPost: boolean,
     IsFollowing: boolean
}

function PostCard({ post, IsLikedPost, IsFollowing }: Props) {
     const navigate = useNavigate();
     const { Toast } = UseToastMsg();
     const dispatch: Dispatch<any> = useDispatch();
     const [showComments, setComments] = useState<boolean>(false);
     const { userCredential, following } = useSelector((store: RootState) => store.auth)
     const [isOpen, onOpen, onClose]: any = useToggle(false)
     const { likes } = useSelector((store: RootState) => store.post)

     const onCreateComment = (message: string) => {
          if (!userCredential._id) navigate("/login")
          const data = {
               message,
               postID: post._id,
               author: userCredential._id,
               authorID: userCredential._id
          }
          dispatch(createComment(data))
     }

     const DeletePost = () => {
          dispatch(deletePost(post._id))
     }

     const FollowUser = () => {
          if (!userCredential._id) navigate("/login")

          const data = {
               userID: userCredential._id,
               followingID: post.authorID
          }
          console.log('data: ', data);
          dispatch(followUser(data, Toast))
     }


     const LikePost = () => {
          dispatch(likePost(post._id, userCredential._id))
     }

     const UnLikePost = () => {
          dispatch(unLikePost(post._id, userCredential._id))
     }

     return (
          <Box as='article' p='2' pb='0' border={'1px'} borderColor={'gray.400'} borderRadius='5px'>

               {isOpen && <UpdatePost post={post} onClose={onClose} />}

               <Flex as='header' gap='10px' pb='2'>
                    <Flex gap='10px' as={Link} to={`/user/${post._id}`}>
                         <Box className='post-header-image'>
                              <Image src={post.author.photoURL || "https://bit.ly/3kkJrly"} />
                         </Box>
                         <Box className='post-header-details'>
                              <Text textTransform={"capitalize"} _hover={{ textDecor: "underline" }}>{post.author.username}</Text>
                              <Text textTransform={"capitalize"} fontWeight={'semibold'} color='gray.600'>{post.author.bio}</Text>
                              <Text fontWeight={'semibold'} color='gray.500'>{dateFormatter.format(post.createdAt)}</Text>
                         </Box>
                    </Flex>
                    <Flex ml={'auto'} align='center' gap='10px'>
                         {IsFollowing && userCredential._id !== post.authorID &&
                              <Button variant={'outline'} onClick={FollowUser}>+ Follow</Button>
                         }
                         <Box className='post-options-menu'>
                              <Box className='hamberger-menu'>
                                   <Text></Text>
                                   <Text></Text>
                                   <Text></Text>
                              </Box>
                              <Box className='post-options-list'>
                                   <UnorderedList fontWeight={'semibold'}>
                                        <ListItem>Report</ListItem>
                                        {post.authorID == userCredential._id && (
                                             <>
                                                  <ListItem className='edit-btn'>
                                                       <Button w='100%' h='100%' p='.5em' pl='.75em' variant={'unstyled'} textAlign='left' onClick={onOpen}>Edit</Button>
                                                  </ListItem>
                                                  <ListItem onClick={DeletePost}>Delete</ListItem>
                                             </>
                                        )}
                                        <ListItem>Save</ListItem>
                                   </UnorderedList>
                              </Box>
                         </Box>
                    </Flex>
               </Flex>

               <hr />

               <Box as='section' className='post-main'>
                    <Box className='post-content-description'>
                         <Text className='post-content-title'>{post.title}</Text>
                         <Text className='post-content-message'>{post.description}</Text>
                         {post.description.length > 150 && <Box className='expand-btn'>
                              <input type="checkbox" data-expand-btn='true' />
                         </Box>}
                    </Box>
                    <Box as={Link} to={`/post/${post._id}`} className='post-content-image'>
                         <Image src={post?.content} />
                    </Box>
               </Box>

               <hr style={{ margin: "5px 0" }} />

               <Flex as='footer' p='1' className='post-footer'>
                    <Flex tabIndex={0} color={IsLikedPost ? "blue.400" : ''} onClick={IsLikedPost ? UnLikePost : LikePost} align={'center'} gap='5px' flex={1} justify='center' p='2'>
                         <Text>{IsLikedPost ? <AiFillLike /> : <BiLike />}</Text>
                         <Text> <span>{post.likes}</span> Like</Text>
                    </Flex>
                    <Flex onClick={() => setComments(v => !v)} align={'center'} gap='5px' flex={1} justify='center' p='2'>
                         <Text><BiCommentDots /></Text>
                         <Text>Comment</Text>
                    </Flex>
                    <Flex align={'center'} gap='5px' flex={1} justify='center' p='2'>
                         <Text><FaShare /></Text>
                         <Text>Share</Text>
                    </Flex>
               </Flex>

               <hr style={{ margin: "5px 0" }} />

               {showComments && (
                    <Box as='section' className='comments-container'>

                         <CommentForm autoFocus={true} onSubmit={onCreateComment} />

                         {post?.RootComments != null && post?.RootComments.length > 0 &&
                              <CommentsList comments={post.RootComments} replies={post.Replies} />
                         }
                    </Box>
               )}
          </Box >
     )
}

export default PostCard