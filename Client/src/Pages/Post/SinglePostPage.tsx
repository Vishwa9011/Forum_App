import { Box } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Dispatch } from "redux";
import PostCard from "../../Components/Cards/PostCards/PostCard";
import SingleUserCard from "../../Components/Cards/PostCards/SingleUserCard";
import Navbar from "../../Components/Navbar/Navbar";
import { IPost } from "../../Constants/constant";
import { getSinglePost } from "../../Redux/Post/post.actions";
import UserPostCard from "../Profile/UserPostCard";
import UpdatePost from "./UpdatePost";

function SinglePostPage() {
  const { id } = useParams();
  const [post, setPost] = useState<IPost>();
  const dispatch: Dispatch<any> = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (id) {
      dispatch(getSinglePost(id, setPost));
    }
  }, []);
  return (
    <>
      <Navbar />
      {post ? <SingleUserCard post={post} /> : "Please Wait"}
      {post && (
        <UpdatePost
          post={post}
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
    </>
  );
}

export default SinglePostPage;
