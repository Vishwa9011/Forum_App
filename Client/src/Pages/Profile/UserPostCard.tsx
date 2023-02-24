import {
  Flex,
  Circle,
  Box,
  Image,
  Badge,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  Avatar,
  Button,
} from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiShoppingCart } from "react-icons/fi";
import { IPost } from "../../Constants/constant";

type Props = {
  post: IPost;
};

function UserPostCard({ post }: Props) {
  return (
    <Flex alignItems="center" justifyContent="center">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        _hover={{ transform: "scale(1.1)" }}
        transition="transform 0.3s ease"
        position="relative"
      >
        <Image
          h={"250px"}
          objectFit="cover"
          src={post?.content}
          alt={`Picture of ${post.title}`}
          roundedTop="lg"
        />
        <Flex mt="1" justifyContent="space-between" alignContent="center">
          <Box
            fontSize="lg"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            p={2}
          >
            {post.title}
          </Box>
        </Flex>
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          bg="blackAlpha.500"
          opacity={0}
          transition="opacity 0.2s"
          _hover={{
            opacity: 1,
          }}
          rounded="lg"
        >
          <Button
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            colorScheme="whiteAlpha"
          >
            View Post
          </Button>
        </Box>
      </Box>
    </Flex>
  );
}

export default UserPostCard;
