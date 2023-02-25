import { Box, Button, Grid, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import PostCard from "../../Components/Cards/PostCards/PostCard";
import { IPost } from "../../Constants/constant";
import { getAllPost } from "../../Redux/Post/post.actions";
import { RootState } from "../../Redux/store";
import Createpost from "./Createpost";
import UpdatePost from "./UpdatePost";

function Post() {
  const dispatch: Dispatch<any> = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts } = useSelector((store: RootState) => store.post);
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    dispatch(getAllPost());
  }, []);

  const UpdatePostData = (post: IPost) => {
    setPost(post);
  };

  return (
    <Box>
      <Grid maxW={"500px"} w="500px" m="auto">
        <Box>
          <Createpost />
        </Box>
        <Grid gap="10px" minH="fit-content">
          {posts.map((post: IPost) => {
            return <PostCard post={post} key={post._id} />;
          })}
        </Grid>
      </Grid>
    </Box>
  );
}

export default Post;
