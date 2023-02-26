import { Flex, Circle, Box, Image, Badge, useColorModeValue, Icon, chakra, Tooltip, Avatar, Button, Text, } from "@chakra-ui/react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
import { HiExternalLink } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IPost } from "../../Constants/constant";

type Props = {
   post: IPost;
};

function UserPostCard({ post }: Props) {
   return (
      <Flex border={'1px'} borderRadius='10px' overflow={'hidden'} borderColor={'gray.300'} flexDir={'column'} justifyContent="space-between" h='100%'>
         <Flex className="card-shadow" flexDir={'column'} justifyContent="space-between" p='2' h='100%' rounded="lg" _hover={{ transform: "scale(1.05)" }} transition="transform 0.3s ease" position="relative">
            <Box minH='250px'>
               <Image objectFit="cover" minH='250px' objectPosition={'center'} src={post?.content} alt={`Picture of ${post.title}`} roundedTop="lg" />
            </Box>
            <Box fontSize={'.8rem'} mt="1" justifyContent="space-between" alignContent="center">
               <Text fontSize={'.8rem'} fontWeight="semibold" lineHeight="tight" isTruncated >
                  {post.title}
               </Text>
               <Text fontSize={'.8rem'} className="text-elipsis" fontWeight="semibold" lineHeight="tight" isTruncated>
                  {post.description}
               </Text>
            </Box>
            <Box position="absolute" top={0} left={0} w="100%" h="100%" bg="blackAlpha.500" opacity={0}
               transition="opacity 0.2s" _hover={{ opacity: 1, }} rounded="lg">
               <Button display={'flex'} alignItems='center' gap={'1'} as={Link} to={`/post/${post._id}`} size={"sm"} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" colorScheme="whiteAlpha">
                  View Post
                  <Text fontSize={'1.3rem'}><HiExternalLink /></Text>
               </Button>
            </Box>
         </Flex>
      </Flex>
   );
}

export default UserPostCard;
