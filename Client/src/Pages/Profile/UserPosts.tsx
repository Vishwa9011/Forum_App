import {
  Box,
  Button,
  Container,
  Grid,
  GridItem,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import PostCard from "../../Components/Cards/PostCards/PostCard";
import { IPost } from "../../Constants/constant";
import {
  getAllPost,
  getSingleUserAllPost,
} from "../../Redux/Post/post.actions";
import { RootState } from "../../Redux/store";
import UpdatePost from "../Post/UpdatePost";
import UserPostCard from "./UserPostCard";

function UserPost() {
  const dispatch: Dispatch<any> = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { posts } = useSelector((store: RootState) => store.post);
  const { _id } = useSelector((store: RootState) => store.auth.userCredential);
  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    dispatch(getSingleUserAllPost(_id));
  }, []);

  const UpdatePostData = (post: IPost) => {
    setPost(post);
  };

  return (
    <Grid
      my={"40px"}
      gap={"20px 20px"}
      templateColumns={{
        base: `repeat(2, 1fr)`,
        md: "repeat(3, 1fr)",
        lg: "repeat(4, 1fr)",
      }}
      cursor="pointer"
    >
      {posts.map((post: IPost) => {
        return (
          <GridItem key={post._id}>
            <UserPostCard post={post} />
          </GridItem>
        );
      })}
    </Grid>
  );
}

export default UserPost;
