import { useState, useEffect } from "react";
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
  BellIcon,
  ChatIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import UserProfile from "./UserProfile";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import useToggle from "../../Custom-Hooks/useToggle";
import SearchBar from "../Searchbar/SearchBar";
import "./Navbar.css";
const Links = [
  {
    name: "Home",
    icon: <FaHome />,
    href: "/",
  },
  {
    name: "Contact Us",
    icon: <ChatIcon />,
    href: "mailto:palairanjan2002@gmail.com",
  },
  {
    name: "Notifications",
    icon: <BellIcon />,
    href: "/notifications",
  },
];

export default function Navbar() {
  const [searchParam, setSearchParams] = useSearchParams();
  const { userCredential } = useSelector((store: RootState) => store.auth);
  const [isOpen, onOpen, onClose]: any = useToggle(false);
  const [isOpenSearchbar, openSearch, closeSearch]: any = useToggle(false);
  return (
    <>
      {isOpenSearchbar && <SearchBar toggle={closeSearch} />}
      <Box
        px={4}
        shadow={"md"}
        pos="sticky"
        top="0"
        left="0"
        zIndex={99}
        bg="white"
      >
        <Container maxW={"6xl"}>
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
                className="logo"
                as={Link}
                to="/"
                fontSize={"1.3rem"}
                letterSpacing="1px"
                fontWeight="bold"
                cursor={"pointer"}
              >
                <Text as="span">F</Text>
                <Text as="span" color={"red.500"}>
                  O
                </Text>
                <Text as="span">R</Text>
                <Text as="span" color={"red.500"}>
                  U
                </Text>
                <Text as="span">M</Text>
              </Box>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link, i) => (
                  <Text
                    fontWeight={"semibold"}
                    letterSpacing="1px"
                    fontSize={"1.1em"}
                    as={Link}
                    key={i}
                    to={`${link.href}`}
                  >
                    {link.name}
                  </Text>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={"center"} gap="20px">
              <Flex
                display={{ base: "none", md: "flex" }}
                onClick={openSearch}
                className="user-select-reject"
                cursor={"pointer"}
                border={"1px"}
                borderRadius="5px"
                borderColor="gray.300"
                align={"center"}
                p="1"
              >
                <Box
                  flex={1}
                  w="200px"
                  pl="2"
                  color={"gray.600"}
                  fontWeight="semibold"
                >
                  {searchParam.get("user") || "Search"}
                </Box>
                <Flex
                  borderLeft={"1px"}
                  p="1"
                  pl="2"
                  align={"center"}
                  fontSize={"1.5rem"}
                >
                  <SearchIcon />
                </Flex>
              </Flex>
              {userCredential.token ? (
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
                  <Link key={i} to={`${link.href}`}>
                    {link.name}
                  </Link>
                ))}
              </Stack>
              <Flex
                onClick={openSearch}
                className="user-select-reject"
                cursor={"pointer"}
                border={"1px"}
                borderRadius="5px"
                borderColor="gray.300"
                align={"center"}
                p="1"
              >
                <Box
                  flex={1}
                  w="200px"
                  pl="2"
                  color={"gray.600"}
                  fontWeight="semibold"
                >
                  {searchParam.get("user") || "Search"}
                </Box>
                <Flex
                  borderLeft={"1px"}
                  p="1"
                  pl="2"
                  align={"center"}
                  fontSize={"1.5rem"}
                >
                  <SearchIcon />
                </Flex>
              </Flex>
            </Box>
          ) : null}
        </Container>
      </Box>
    </>
  );
}
