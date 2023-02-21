import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  useDisclosure,
  useColorModeValue,
  Stack,
  Container,
  Input,
  InputRightElement,
  InputGroup,
  IconButton,
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

const Links = [
  {
    name: "Home",
    icon: <FaHome />,
  },
  {
    name: "Message",
    icon: <ChatIcon />,
  },
  {
    name: "Notifications",
    icon: <BellIcon />,
  },
];

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
            <Box fontSize={"xl"} fontWeight="bold" cursor={"pointer"}>
              Forum
            </Box>
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link.name}>
                  <Flex alignItems={"center"} gap="2">
                    {link.icon}
                    {link.name}
                  </Flex>
                </NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <SearchBar />
            <UserProfile />
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
                  <Flex alignItems={"center"} gap="4">
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
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    <Flex alignItems={"center"}>{children}</Flex>
  </Link>
);
