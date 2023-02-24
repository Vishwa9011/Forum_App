import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  ListItem,
  Stack,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { BiCommentDots, BiLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import "./PostCard.css";
import axios from "axios";
import { IComment, IPost } from "../../../Constants/constant";
import CommentsList from "../Comments/CommentsList";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { createComment, getComments } from "../../../Redux/Post/post.actions";
import { RootState } from "../../../Redux/store";
import CommentForm from "../Comments/CommentForm";
import { dateFormatter } from "../../../helper/helper";
import UpdatePost from "../../../Pages/Post/UpdatePost";

type Props = {
  post: IPost;
  onOpen: () => void;
  update: (post: IPost) => void;
};

function PostCard({ post, onOpen, update }: Props) {
  const [data, setData] = useState<any>([]);
  const dispatch: Dispatch<any> = useDispatch();
  const [showComments, setComments] = useState<boolean>(false);

  const onCreateComment = (message: string) => {
    const data = {
      message,
      postID: post._id,
    };
    dispatch(createComment(data));
  };

  useEffect(() => {
    // dispatch(getComments("63f6011e651603c1b8e68269"))
  }, []);

  return (
    <Box
      as="article"
      p="2"
      border={"1px"}
      borderColor={"gray.400"}
      borderRadius="5px"
    >
      <Flex as="header" gap="10px" pb="2">
        <Flex gap="10px">
          <Box className="post-header-image">
            <Image src={post.author.photoURL || "https://bit.ly/3kkJrly"} />
          </Box>
          <Box className="post-header-details">
            <Text textTransform={"capitalize"}>{post.author.username}</Text>
            <Text
              textTransform={"capitalize"}
              fontWeight={"semibold"}
              color="gray.600"
            >
              {post.author.bio}
            </Text>
            <Text fontWeight={"semibold"} color="gray.500">
              {dateFormatter.format(post.createdAt)}
            </Text>
          </Box>
        </Flex>
        <Flex ml={"auto"} align="center" gap="10px">
          <Button variant={"outline"}>+ Follow</Button>
          <Box className="post-options-menu">
            <Box className="hamberger-menu">
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </Box>
            <Box className="post-options-list">
              <UnorderedList fontWeight={"semibold"}>
                <ListItem>Report</ListItem>
                <ListItem onClick={() => (onOpen(), update(post))}>
                  Edit
                </ListItem>
                <ListItem>Delete</ListItem>
                <ListItem>Save</ListItem>
              </UnorderedList>
            </Box>
          </Box>
        </Flex>
      </Flex>

      <hr />

      <Box as="section" className="post-main">
        <Box className="post-content-description">
          <Text className="post-content-title">{post.title}</Text>
          <Text className="post-content-message">{post.description}</Text>
          <input type="checkbox" className="expand-btn" data-expand-btn="" />
        </Box>
        <Box className="post-content-image">
          <Image src={post?.content} />
        </Box>
      </Box>

      <hr style={{ margin: "5px 0" }} />

      <Flex as="footer" p="1" className="post-footer">
        <Flex align={"center"} gap="5px" flex={1} justify="center" p="2">
          <Text>
            <BiLike />
          </Text>
          <Text>Like</Text>
        </Flex>
        <Flex
          onClick={() => setComments((v) => !v)}
          align={"center"}
          gap="5px"
          flex={1}
          justify="center"
          p="2"
        >
          <Text>
            <BiCommentDots />
          </Text>
          <Text>Comment</Text>
        </Flex>
        <Flex align={"center"} gap="5px" flex={1} justify="center" p="2">
          <Text>
            <FaShare />
          </Text>
          <Text>Share</Text>
        </Flex>
      </Flex>

      <hr style={{ margin: "5px 0" }} />

      {showComments && (
        <Box as="section" className="comments-container">
          <CommentForm autoFocus={true} onSubmit={onCreateComment} />

          {post?.RootComments != null && post?.RootComments.length > 0 && (
            <CommentsList comments={post.RootComments} replies={post.Replies} />
          )}
        </Box>
      )}
    </Box>
  );
}

export default PostCard;
