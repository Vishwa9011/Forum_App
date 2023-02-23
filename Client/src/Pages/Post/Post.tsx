import { Box, Button, Grid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import PostCard from '../../Components/Cards/PostCards/PostCard'
import { IPost } from '../../Constants/constant';
import { getAllPost } from '../../Redux/Post/post.actions';
import { RootState } from '../../Redux/store';
import Createpost from './Createpost';

function Post() {

     const dispatch: Dispatch<any> = useDispatch()
     const { posts } = useSelector((store: RootState) => store.post);
     console.log('posts: ', posts);

     useEffect(() => {
          dispatch(getAllPost());
     }, [])

     return (
          <Box>
               <Grid maxW={"500px"} w='500px' m='auto'>
                    <Box>
                         {/* <Button as={Link} to='/create'>Create Post</Button> */}
                         <Createpost />
                    </Box>
                    <Grid gap='10px' minH='600px'>
                         {posts.map((post: IPost) => {
                              return <PostCard post={post} key={post._id} />
                         })}
                    </Grid>
               </Grid>
          </Box >
     )
}

export default Post