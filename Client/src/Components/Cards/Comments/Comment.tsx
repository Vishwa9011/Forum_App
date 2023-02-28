import { Avatar, Box, Button, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import * as Action from '../../../Redux/Post/comment.actions';
import { IComment } from '../../../Constants/constant'
import { useDispatch, useSelector } from 'react-redux'
import { CalcTime } from '../../../helper/helper'
import { RootState } from '../../../Redux/store'
import { HiDotsVertical } from 'react-icons/hi'
import IconBtn from '../../IconBtn/IconBtn'
import CommentsList from './CommentsList'
import { FaReply } from 'react-icons/fa'
import CommentForm from './CommentForm'
import React, { useState } from 'react'
import { Dispatch } from 'redux'

import "./Comment.css"
import { Link } from 'react-router-dom';

type Props = {
     comment: IComment,
     replies: any,
}

function Comment({ comment, replies }: Props) {

     const dispatch: Dispatch<any> = useDispatch()
     const [IsReplying, setIsReplying] = useState(false);
     const [IsEditing, setIsEditing] = useState(false);
     const { userCredential } = useSelector((store: RootState) => store.auth)

     const getReplies = (parentID: string): IComment[] => {
          return replies[parentID];
     }

     const childComments = getReplies(comment._id);

     const onCommentReply = (message: string) => {
          const data = {
               message,
               postID: comment.postID,
               parent: comment._id,
               parentID: comment._id,
               author: userCredential._id,
               authorID: userCredential._id
          }
          dispatch(Action.createComment(data))
          setIsReplying(false);
     }

     const onCommentUpdate = (message: string) => {
          dispatch(Action.updateComment(message, comment._id))
          setIsEditing(false)
     }

     return (
          <>
               <Box mt='10px' pl={`${comment?.parentID ? "45px" : ""}`}>
                    <Box as='article' className={`user-comment comment-body `} >
                         <Box as="header" className='comment-user-img'>
                              <Avatar bg="purple.400" color='blackAlpha.800' boxSize='45px' name={comment.author?.username} src={comment.author?.photoURL || "https://bit.ly/3kkJrly"} />
                         </Box>
                         <Box as='section' className='comment'>
                              <Box borderColor={'gray.400'} as='section' className='comment-main'>
                                   <Box className='comment-header'>
                                        <Box as={Link} to={`/user/${comment.authorID}`}>
                                             <Text className='comment-username'>{comment.author?.username}</Text>
                                             <Text className='comment-date-time' fontWeight={'semibold'} color='gray.500'>
                                                  <Text as='span'>{CalcTime(comment.createdAt)}</Text>
                                                  <Text as='span' ml='3'>{comment.edited ? "• Edited" : ""}</Text>
                                             </Text>
                                        </Box>
                                        {(comment.authorID === userCredential?._id) &&
                                             (<Box className='comment-options-menu'>
                                                  <Button className='hamberger-menu' fontSize={'1.5rem'}>
                                                       <HiDotsVertical />
                                                  </Button>
                                                  <Box className='comment-options-list'>
                                                       <UnorderedList fontWeight={'semibold'} >
                                                            <ListItem onClick={() => setIsEditing(true)}>Edit</ListItem>
                                                            <ListItem onClick={() => dispatch(Action.deleteComment(comment._id))}>Delete</ListItem>
                                                       </UnorderedList>
                                                  </Box>
                                             </Box>)
                                        }
                                   </Box>
                                   <Box className="comment-description">
                                        <Text>{comment.message}</Text>
                                        <Box className='comment-expand-btn'>
                                             <input type="checkbox" data-expand-btn='true' />
                                        </Box>
                                   </Box>
                              </Box>



                              <Box as='footer' className='comment-like-reply' color={'gray.700'} >
                                   {/* <Box className='comment-like'>
                                   <IconBtn Icon={BiLike} arial-label="like">
                                        Like
                                   </IconBtn>
                              </Box> */}
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
                    {IsReplying && (
                         <Box className='nested-reply' ml='45px'>
                              <CommentForm onSubmit={onCommentReply} autoFocus={true} />
                         </Box>
                    )}

                    {IsEditing && (
                         <Box className='nested-reply' ml='45px'>
                              <CommentForm onSubmit={onCommentUpdate} initialValue={comment.message} autoFocus={true} />
                         </Box>
                    )}
               </Box>
               {childComments && childComments?.length > 0 && (
                    <Box className='nested-comments'>
                         <CommentsList comments={childComments} replies={replies} />
                    </Box>
               )}
          </>
     )
}

export default Comment