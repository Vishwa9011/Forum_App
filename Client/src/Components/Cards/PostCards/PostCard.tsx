import { Box, Button, Flex, Image, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { followUser, unFollowUser } from '../../../Redux/Auth/auth.actions'
import * as commentAction from '../../../Redux/Post/comment.actions'
import * as postAction from '../../../Redux/Post/post.actions'
import { BiCommentDots, BiLike } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { CalcTime } from '../../../helper/helper'
import UpdatePost from '../../../Pages/Post/UpdatePost'
import useToggle from '../../../Custom-Hooks/useToggle'
import UseToastMsg from '../../../Custom-Hooks/Toast'
import { Link, useNavigate } from 'react-router-dom'
import CommentsList from '../Comments/CommentsList';
import { IPost } from '../../../Constants/constant'
import CommentForm from '../Comments/CommentForm'
import { RootState } from '../../../Redux/store'
import { AiFillLike } from 'react-icons/ai'
import { FaShare } from 'react-icons/fa'
import React, { useState } from 'react'
import { Dispatch } from 'redux'
import './PostCard.css'

type Props = {
  post: IPost,
  IsLikedPost: boolean,
  IsFollowing: boolean
}

function PostCard({ post, IsLikedPost, IsFollowing }: Props) {
  const navigate = useNavigate();
  const { Toast } = UseToastMsg();
  const [like, setLike] = useState(post.likes)
  const dispatch: Dispatch<any> = useDispatch();
  const [showComments, setComments] = useState<boolean>(false);
  const { userCredential } = useSelector((store: RootState) => store.auth);
  const [isOpen, onOpen, onClose]: any = useToggle(false);

  const onCreateComment = (message: string) => {
    if (!userCredential._id) return navigate("/login");
    const data = {
      message,
      postID: post._id,
      author: userCredential._id,
      authorID: userCredential._id,
    };
    dispatch(commentAction.createComment(data));
  };

  const DeletePost = () => {
    if (!userCredential._id) return navigate("/login");
    dispatch(postAction.deletePost(post._id));
  };

  const FollowUser = () => {
    if (!userCredential._id) return navigate("/login");

    const data = {
      userID: userCredential._id,
      followingID: post.authorID,
    };
    console.log("data: ", data);
    dispatch(followUser(data, Toast));
  };

  const LikePost = () => {
    if (!userCredential._id) return navigate("/login");

    dispatch(postAction.likePost(post._id, userCredential._id));
    dispatch(postAction.getAllPost())
  }

  const UnLikePost = () => {
    if (!userCredential._id) return navigate("/login");

    dispatch(postAction.unLikePost(post._id, userCredential._id))
    dispatch(postAction.getAllPost())

  }


  return (
    <Box as='article' p='2' pb='0' border={'1px'} borderColor={'gray.400'} borderRadius='5px'>

      {isOpen && <UpdatePost post={post} onClose={onClose} />}

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
        <Box as={Link} to={`/post/${post._id}`} >
          <Box className='post-content-image'>
            <Image src={post?.content} />
          </Box>
        </Box>
      </Box>

      <hr style={{ margin: "5px 0" }} />

      <Flex as='footer' p='1' className='post-footer'>
        <Flex className='user-select-reject' tabIndex={0} color={IsLikedPost ? "blue.400" : ''} onClick={() => {
          IsLikedPost ? (UnLikePost(), setLike(like - 1)) : (LikePost(), setLike(like + 1))
        }}
          align={'center'} gap='5px' flex={1} justify='center' p='2'>
          <Text>{IsLikedPost ? <AiFillLike /> : <BiLike />}</Text>
          <Text><span>{like}</span> Like</Text>
        </Flex>
        <Flex className='user-select-reject' onClick={() => setComments(v => !v)} align={'center'} gap='5px' flex={1} justify='center' p='2'>
          <Text><BiCommentDots /></Text>
          <Text>Comment</Text>
        </Flex>
        <Flex className='user-select-reject' align={'center'} gap='5px' flex={1} justify='center' p='2'>
          <Text><FaShare /></Text>
          <Text>Share</Text>
        </Flex>
      </Flex>

      <hr style={{ margin: "5px 0" }} />

      {
        showComments && (
          <Box as='section' className='comments-container'>

            <CommentForm autoFocus={true} onSubmit={onCreateComment} />

            {post?.RootComments != null && post?.RootComments.length > 0 &&
              <CommentsList comments={post.RootComments} replies={post.Replies} />
            }
          </Box>
        )
      }
    </Box >
  )

}

export default PostCard;
