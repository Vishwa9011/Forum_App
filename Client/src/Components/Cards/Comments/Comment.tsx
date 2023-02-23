import { Box, Button, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import React, { useState } from 'react'
import { IComment } from '../../../Constants/constant'
import { dateFormatter } from '../../../helper/helper'
import IconBtn from '../../IconBtn/IconBtn'
import { BiLike } from 'react-icons/bi'
import { FaReply, FaShare } from 'react-icons/fa'
import { HiDotsVertical } from 'react-icons/hi'

import "./Comment.css"
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../Redux/store'
import CommentsList from './CommentsList'
import CommentForm from './CommentForm'
import { Dispatch } from 'redux'
import { createComment } from '../../../Redux/Post/post.actions'

type Props = {
     comment: IComment,
     replies: any,
}



function Comment({ comment, replies }: Props) {

     const dispatch: Dispatch<any> = useDispatch()
     const [IsReplying, setIsReplying] = useState(false);

     const getReplies = (parentID: string): IComment[] => {
          return replies[parentID];
     }

     const childComments = getReplies(comment._id);

     const onCommentReply = (message: string) => {
          const data = {
               message,
               postID: comment.postID,
               parent: comment._id,
               parentID: comment._id
          }
          dispatch(createComment(data))
          setIsReplying(false);
     }

     return (
          <>
               <Box as='article' className='user-comment comment-body' mt='10px'>
                    <Box as="header" className='comment-user-img'>
                         <Image src={comment.author.photoURL || "https://bit.ly/3kkJrly"} alt="" />
                    </Box>
                    <Box as='section' className='comment'>
                         <Box borderColor={'gray.400'} as='section' className='comment-main'>
                              <Box className='comment-header'>
                                   <Box>
                                        <Text className='comment-username'>{comment.author.username}</Text>
                                        <Text className='comment-date-time' fontWeight={'semibold'} color='gray.500'>{dateFormatter.format(comment.createdAt)}</Text>
                                   </Box>
                                   <Box className='comment-options-menu'>
                                        <Button className='hamberger-menu' fontSize={'1.5rem'}>
                                             <HiDotsVertical />
                                        </Button>
                                        <Box className='comment-options-list'>
                                             <UnorderedList fontWeight={'semibold'} >
                                                  <ListItem>Edit</ListItem>
                                                  <ListItem>Delete</ListItem>
                                             </UnorderedList>
                                        </Box>
                                   </Box>
                              </Box>
                              <Box className="comment-description">
                                   <Text>{comment.message}</Text>
                                   <Box className='comment-expand-btn'>
                                        <input type="checkbox" data-expand-btn='true' />
                                   </Box>
                              </Box>
                         </Box>
                         <Box as='footer' className='comment-like-reply' color={'gray.700'} >
                              <Box className='comment-like' >
                                   <IconBtn Icon={BiLike} arial-label="like">
                                        Like
                                   </IconBtn>
                              </Box>
                              <Box className='comment-reply'>
                                   <IconBtn
                                        Icon={FaReply}
                                        onClick={() => setIsReplying(prev => !prev)}
                                        arial-label={IsReplying ? "Cancel-Reply" : "Reply"}>
                                        {IsReplying ? "Cancel-Reply" : "Reply"}
                                   </IconBtn>
                              </Box>
                         </Box>
                    </Box>
               </Box>
               {
                    IsReplying && (
                         <Box className='nested-reply' marginLeft={'40px'}>
                              <CommentForm onSubmit={onCommentReply} autoFocus={true} />
                         </Box>
                    )
               }

               {
                    childComments && childComments?.length > 0 && (
                         <Box className='nested-comments' ml='45px'>
                              <CommentsList comments={childComments} replies={replies} />
                         </Box>
                    )
               }
          </>
     )
}

export default Comment