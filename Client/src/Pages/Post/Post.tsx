import { Box, Grid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import PostCard from '../../Components/Cards/PostCards/PostCard'
import { IPost } from '../../Constants/constant';
import { getAllPost } from '../../Redux/Post/post.actions';
import { RootState } from '../../Redux/store';

function Post() {

     const dispatch: Dispatch<any> = useDispatch()
     const { posts } = useSelector((store: RootState) => store.post);

     useEffect(() => {
          dispatch(getAllPost());
     }, [])

     return (
          <Box>
               <Grid>
                    <Box maxW={"500px"} w='500px' m='auto' border={'1px'} minH='600px'>
                         {posts.map((post: IPost) => {
                              return <PostCard post={post} key={post._id} />
                         })}
                    </Box>
               </Grid>
          </Box >
     )
}

export default Post