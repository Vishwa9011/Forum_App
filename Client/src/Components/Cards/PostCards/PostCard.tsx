import { Box, Button, Flex, Image, Input, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react'
import React, { useEffect, useMemo, useState } from 'react'
import { BiCommentDots, BiLike } from 'react-icons/bi'
import { FaShare } from 'react-icons/fa'
import './PostCard.css'
import axios from 'axios'
import { IComment, IPost } from '../../../Constants/constant'
import CommentsList from '../Comments/CommentsList';
import { Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'
import { createComment, getComments } from '../../../Redux/Post/post.actions'
import { RootState } from '../../../Redux/store'
import CommentForm from '../Comments/CommentForm'

type Props = {
     post: IPost
}

function PostCard({ post }: Props) {
     const [data, setData] = useState<any>([]);
     const dispatch: Dispatch<any> = useDispatch()
     // const { posts } = useSelector((store: RootState) => store.post);
     const { userCredential } = useSelector((store: RootState) => store.auth);

     const onCreateComment = (message: string) => {
          const data = {
               message,
               postID: post._id
          }
          dispatch(createComment(data))
     }



     useEffect(() => {
          // dispatch(getComments("63f6011e651603c1b8e68269"))
     }, [])



     return (
          <Box as='article' p='2'>
               <Flex as='header' gap='10px' >
                    <Flex gap='10px'>
                         <Box className='post-header-image'>
                              <Image src='https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png' />
                         </Box>
                         <Box className='post-header-details'>
                              <Text>{post.author.username}</Text>
                              <Text>{post.author.bio}</Text>
                              <Text>{post.createdAt}</Text>
                         </Box>
                    </Flex>
                    <Flex ml={'auto'} align='center' gap='10px'>
                         <Button>Follow</Button>
                         <Box className='post-options-menu'>
                              <Box className='hamberger-menu'>
                                   <Text></Text>
                                   <Text></Text>
                                   <Text></Text>
                              </Box>
                              <Box className='post-options-list'>
                                   <UnorderedList fontWeight={'semibold'} >
                                        <ListItem>Report</ListItem>
                                        <ListItem>Edit</ListItem>
                                        <ListItem>Delete</ListItem>
                                        <ListItem>Save</ListItem>
                                   </UnorderedList>
                              </Box>
                         </Box>
                    </Flex>
               </Flex>

               <hr />

               <Box as='section' className='post-main'>
                    <Box className='post-content-description'>
                         <Text className='post-content-title'>I Am the best Coder In the World</Text>
                         <Text className='post-content-message'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia, placeat in! Vel unde, nesciunt, voluptates explicabo doloribus, officiis animi numquam at dolores laudantium ipsum sequi repudiandae accusamus soluta? Culpa, beatae!</Text>
                         <input type='checkbox' className='expand-btn' data-expand-btn='' />
                    </Box>
                    <Box className='post-content-image'>
                         <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNPX-BSMWAUKrcRFDtDa-0F9Whjo-wl8JNkA&usqp=CAU' />
                    </Box>
               </Box>

               <hr style={{ margin: "5px 0" }} />

               <Flex as='footer' p='1' className='post-footer'>
                    <Flex align={'center'} gap='5px' flex={1} justify='center' p='2'>
                         <Text><BiLike /></Text>
                         <Text>Like</Text>
                    </Flex>
                    <Flex align={'center'} gap='5px' flex={1} justify='center' p='2'>
                         <Text><BiCommentDots /></Text>
                         <Text>Comment</Text>
                    </Flex>
                    <Flex align={'center'} gap='5px' flex={1} justify='center' p='2'>
                         <Text><FaShare /></Text>
                         <Text>Share</Text>
                    </Flex>
               </Flex>

               <hr style={{ margin: "5px 0" }} />

               <Box as='section' className='comments-container'>

                    <CommentForm autoFocus={true} onSubmit={onCreateComment} />

                    {post?.RootComments != null && post?.RootComments.length > 0 &&
                         <CommentsList comments={post.RootComments} replies={post.Replies} />
                    }
               </Box>
          </Box >
     )
}

export default PostCard