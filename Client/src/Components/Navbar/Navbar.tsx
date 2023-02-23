import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,

  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  SearchIcon,
  BellIcon,
  ChatIcon,
} from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import UserProfile from "./UserProfile";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

const Links = [
  {
    name: "Home",
    icon: <FaHome />,
    href: "/",
  },
  {
    name: "Message",
    icon: <ChatIcon />,
    href: "/message",
  },
  {
    name: "Notification",
    icon: <BellIcon />,
    href: "/notifications",
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userCredential } = useSelector((store: RootState) => store.auth)

  return (
    <Box bg={useColorModeValue("#fff", "gray.900")} px={4} shadow={"md"}>
      <Container maxW={"5xl"}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Box
              as={Link}
              to="/"
              fontSize={"xl"}
              fontWeight="bold"
              cursor={"pointer"}
            >
              Forum
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link, i) => (
                <Link key={i} to={`${link.href}`}>{link.name}</Link>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <SearchBar />
            {userCredential?.email ? (
              <UserProfile />
            ) : (
              <Flex gap={2}>
                <Text as={Link} to="/signup">
                  Signup
                </Text>
                <Text>|</Text>
                <Text as={Link} to="/login">
                  Login
                </Text>
              </Flex>
            )}

          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link, i) => (
                <Link key={i} to={`${link.href}`}>{link.name}</Link>
              ))}
            </Stack>
            <SearchBar />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}


