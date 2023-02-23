import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
  Text,
  Divider,
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
  const token: string | null = localStorage.getItem("token");

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
              {Links.map((link) => (
                <NavLink key={link.name}>
                  <Flex as={Link} to={link.href} alignItems={"center"} gap="2">
                    {link.icon}
                    {link.name}
                  </Flex>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <SearchBar />
            {token ? (
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

            {/* <Button
              variant={"solid"}
              colorScheme={"teal"}
              size={"sm"}
              leftIcon={<AddIcon />}
            >
              Action
            </Button> */}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link.name}>
                  <Flex as={Link} to={link.href} alignItems={"center"} gap="4">
                    {link.icon}
                    {link.name}
                  </Flex>
                </NavLink>
              ))}
            </Stack>
            <SearchBar />
          </Box>
        ) : null}
      </Container>
    </Box>
  );
}

const NavLink = ({ children }: { children: ReactNode }) => (
  <Text
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    cursor="pointer"
  >
    <Flex alignItems={"center"}>{children}</Flex>
  </Text>
);
