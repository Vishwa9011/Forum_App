import { Box, Button, Flex, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CalcTime } from '../../helper/helper'
import { useMemo } from 'react';
import { IComment, IFollow, ILikes, IPost } from '../../Constants/constant'
import CommentForm from '../../Components/Cards/Comments/CommentForm'
import CommentsList from '../../Components/Cards/Comments/CommentsList'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../Redux/store'
import { AiFillLike } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import { BiCommentDots, BiLike } from 'react-icons/bi'
import "../../Components/Cards/PostCards/PostCard.css"
import { Dispatch } from 'redux'
import { deletePost, likePost, postLikes, unLikePost } from '../../Redux/Post/post.actions'
import useToggle from '../../Custom-Hooks/useToggle'
import UpdatePost from './UpdatePost'
import Navbar from '../../Components/Navbar/Navbar'
import { followUser } from '../../Redux/Auth/auth.actions'
import UseToastMsg from '../../Custom-Hooks/Toast'
import { createComment } from '../../Redux/Post/comment.actions'

type Props = {}

function SinglePostPage({ }: Props) {


     const { id } = useParams();
     const { Toast } = UseToastMsg()
     const navigate = useNavigate();
     const [post, setPost] = useState<any>();
     console.log('post: ', post);
     const dispatch: Dispatch<any> = useDispatch();
     const [isOpen, onOpen, onClose]: any = useToggle(false);
     const [showComments, setShowComments] = useState<boolean>(false);
     const { userCredential, following } = useSelector((store: RootState) => store.auth);
     const { likes } = useSelector((store: RootState) => store.post);

     const fetchPost = async () => {
          try {
               const response = await axios.get(`/post/${id}`);
               setPost(response.data.post)
          } catch (error) {
               console.log('error: ', error);
          }
     }


     const DeletePost = () => {
          if (!userCredential._id) return navigate("/login");
          dispatch(deletePost(post._id));
          navigate("/")
     };

     const GroupLikedPost = useMemo(() => {
          if (!likes) return;
          const group: any = {};
          likes.forEach((check: ILikes) => {
               group[check.postID] = check;
          });
          return group;
     }, [likes])

     const IsLikedPost = (id: string) => {
          return GroupLikedPost[id] !== undefined
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

     const FollowUser = () => {
          if (!userCredential._id) return navigate("/login");

          const data = {
               userID: userCredential._id,
               followingID: post.authorID,
          };
          console.log("data: ", data);
          dispatch(followUser(data, Toast));
     };

     const onCreateComment = (message: string) => {
          if (!userCredential._id) return navigate("/login");
          const data = {
               message,
               postID: post._id,
               author: userCredential._id,
               authorID: userCredential._id,
          };
          dispatch(createComment(data))
          setTimeout(fetchPost, 1000)
     };

     const LikePost = () => {
          if (!userCredential._id) return navigate("/login");

          dispatch(likePost(post._id, userCredential._id))
          setTimeout(fetchPost, 1000)
     }

     const UnLikePost = () => {
          if (!userCredential._id) return navigate("/login");

          dispatch(unLikePost(post._id, userCredential._id))
          setTimeout(fetchPost, 1000)
     }


     const FinalPostComments: any = useMemo(() => {
          if (post?.comments == null) return {}

          const group: any = {};

          post.comments?.forEach((comment: any) => {
               if (!group[comment?.parentID]) {
                    group[comment?.parentID] = []
               }
               group[comment?.parentID].push(comment)
          })

          const { null: RootComments, ...Replies } = group;

          if (RootComments) {
               RootComments.sort((a: IComment, b: IComment) => b.createdAt - a.createdAt)
          }

          return { RootComments, Replies };
     }, [post?.comments])


     React.useEffect(() => {
          fetchPost();
          dispatch(postLikes(userCredential._id));
     }, [id])


     useEffect(() => {



     }, [])


     return (
          post &&
          <>
               <Navbar />
               {isOpen && <UpdatePost post={post} onClose={onClose} />}
               <Box as='article' p='2' pb='0' border={'1px'} borderColor={'gray.400'} borderRadius='5px' maxW='500px' m='auto' mt='50px'>
                    <Flex as='header' gap='10px' pb='2'>
                         <Flex gap='10px' as={Link} to={`/user/${post.authorID}`}>
                              <Box className={post.author?.online ? 'online' : "offline"}>
                                   <Box className='post-header-image'>
                                        <Image src={post.author.photoURL || "https://bit.ly/3kkJrly"} />
                                   </Box>
                              </Box>
                              <Box className='post-header-details'>
                                   <Flex align={'center'} gap='10px'>
                                        <Text whiteSpace={'nowrap'} textTransform={"capitalize"} _hover={{ textDecor: "underline" }}>{post.author.username}</Text>
                                        {post.author?.online ?
                                             <Box fontSize={'.7em'} color={'green'} display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px" >
                                                  <Box bg="green" borderRadius={"50%"} h="7px" w="7px"></Box>
                                                  <Text fontWeight={"500"}>Online</Text>
                                             </Box>
                                             :
                                             <Box fontSize={'.7em'} color={'gray'} display={"flex"} justifyContent="center" alignItems={"center"} gap="2" borderRadius="10px">
                                                  <Box bg="gray" borderRadius={"50%"} h="7px" w="7px"></Box>
                                                  <Text fontWeight={"500"}>Offline</Text>
                                             </Box>}
                                   </Flex>
                                   <Text textTransform={"capitalize"} fontWeight={'semibold'} color='gray.600'>{post.author.bio || post.author.email}</Text>
                                   <Text fontWeight={'semibold'} color='gray.500'>
                                        <Text as='span'>{CalcTime(post.createdAt)}</Text>
                                        <Text as='span' ml='3'>{post.edited ? "• Edited" : ""}</Text>
                                   </Text>
                              </Box>
                         </Flex>
                         <Flex ml={'auto'} align='center' gap='10px'>
                              {IsFollowing(post?.authorID) && userCredential._id !== post.authorID &&
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
                         <Box className=''>
                              <Text className='post-content-title'>{post.title}</Text>
                              <Text className=''>{post.description}</Text>
                         </Box>
                         <Box className='post-content-image'>
                              <Image src={post?.content} />
                         </Box>
                    </Box>

                    <hr style={{ margin: "5px 0" }} />

                    <Flex as='footer' p='1' className='post-footer'>
                         <Flex className='user-select-reject' tabIndex={0} color={IsLikedPost(post._id) ? "blue.400" : ''} onClick={IsLikedPost(post._id) ? UnLikePost : LikePost} align={'center'} gap='5px' flex={1} justify='center' p='2'>
                              <Text>{IsLikedPost(post._id) ? <AiFillLike /> : <BiLike />}</Text>
                              <Text><span>{post.likes}</span> Like</Text>
                         </Flex>
                         <Flex className='user-select-reject' onClick={() => setShowComments(v => !v)} align={'center'} gap='5px' flex={1} justify='center' p='2'>
                              <Text><BiCommentDots /></Text>
                              <Text>Comment</Text>
                         </Flex>
                         <Flex className='user-select-reject' align={'center'} gap='5px' flex={1} justify='center' p='2'>
                              <Text><FaShare /></Text>
                              <Text>Share</Text>
                         </Flex>
                    </Flex>

                    <hr style={{ margin: "5px 0" }} />

                    {showComments && (
                         <Box as='section' className='comments-container'>

                              <CommentForm autoFocus={true} onSubmit={onCreateComment} />

                              {FinalPostComments?.RootComments != null && FinalPostComments?.RootComments.length > 0 &&
                                   <CommentsList comments={FinalPostComments.RootComments} replies={FinalPostComments.Replies} />
                              }
                         </Box>
                    )}
               </Box>
          </>
     )
}

export default SinglePostPage