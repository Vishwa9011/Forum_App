import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  ListItem,
  Stack,
  Text,
  UnorderedList,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiCommentDots, BiLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import "./PostCard.css";
import { IPost } from "../../../Constants/constant";
import CommentsList from "../Comments/CommentsList";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { createComment, getComments } from "../../../Redux/Post/post.actions";
import CommentForm from "../Comments/CommentForm";
import { dateFormatter } from "../../../helper/helper";

type Props = {
  post: IPost;
  onOpen: () => void;
  update: (post: IPost) => void;
};

function SingleUserCard({ post, onOpen, update }: Props) {
  const dispatch: Dispatch<any> = useDispatch();
  const [showComments, setComments] = useState<boolean>(false);

  const onCreateComment = (message: string) => {
    const data = {
      message,
      postID: post._id,
    };
    dispatch(createComment(data));
  };

  return (
    <Container
      my={"40px"}
      maxW="5xl"
      p="2"
      border={"1px"}
      borderColor={"gray.400"}
      rounded={"lg"}
      shadow="2xl"
    >
      <Flex as="header" gap="10px" pb="2">
        <Flex gap="10px">
          <Box>
            <Avatar
              name={post.author.username}
              bg={"blue.500"}
              src={post.author.photoURL}
            />
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
      <Center py={6}>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          height={{ sm: "476px", md: "20rem" }}
          direction={{ base: "column", md: "row" }}
          bg={useColorModeValue("white", "gray.900")}
          padding={4}
        >
          <Flex flex={1} bg="blue.200">
            <Image objectFit="cover" boxSize="100%" src={post.content} />
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={1}
            pt={2}
          >
            <Heading fontSize={"2xl"} fontFamily={"body"}>
              {post.title}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} size="sm" mb={4}>
              {post.description}
            </Text>

            <Stack
              width={"100%"}
              mt={"2rem"}
              direction={"row"}
              padding={2}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Button
                fontSize={"sm"}
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}
                boxShadow={
                  "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                }
                _hover={{
                  bg: "blue.500",
                }}
                _focus={{
                  bg: "blue.500",
                }}
              >
                Message
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Center>
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
    </Container>
  );
}

export default SingleUserCard;
