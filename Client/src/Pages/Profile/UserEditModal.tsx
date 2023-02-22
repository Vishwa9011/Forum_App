import React from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  AvatarBadge,
  IconButton,
  Center,
  Modal,
  ModalOverlay,
  Button,
  ModalContent,
  Select,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UserEditModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="4xl">
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("gray.50", "gray.800")}>
        <Flex align={"center"} justify={"left"} borderRadius={"5px"}>
          <Stack
            w="full"
            spacing={4}
            bg={useColorModeValue("white", "gray.700")}
            rounded={"xl"}
            p={6}
          >
            <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
              User Profile Edit
            </Heading>
            <FormControl id="userName" w="min-content">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar size="xl" bg="blue.500" name="Ashok Kumar" src="#">
                    <AvatarBadge
                      as={IconButton}
                      size="sm"
                      rounded="full"
                      top="-10px"
                      colorScheme="red"
                      aria-label="remove Image"
                      icon={<SmallCloseIcon />}
                    />
                  </Avatar>
                </Center>
                <Center w="full">
                  <Button w="full">Change Icon</Button>
                </Center>
              </Stack>
            </FormControl>
            <Flex gap="20px">
              <FormControl width={"100%"} id="userName">
                <FormLabel>User Name</FormLabel>
                <Input
                  placeholder="UserName"
                  _placeholder={{ color: "gray.500" }}
                  type="text"
                />
              </FormControl>
              <FormControl width={"100%"} id="gender">
                <FormLabel>Gender</FormLabel>
                <Select>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </Select>
              </FormControl>
            </Flex>
            <Flex gap="20px">
              <FormControl id="mobile" isRequired>
                <FormLabel>Mobile Number</FormLabel>
                <Input
                  placeholder="+91 9999999999"
                  _placeholder={{ color: "gray.500" }}
                  type="number"
                />
              </FormControl>
              <FormControl id="role" isRequired>
                <FormLabel>Occupation</FormLabel>
                <Select
                  placeholder="Select Occupation"
                  _placeholder={{ color: "gray.500" }}
                >
                  <option value="student">Student</option>
                  <option value="engineer">Engineer</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl id="language" w="49%">
              <FormLabel>Language</FormLabel>
              <Input
                placeholder="language"
                _placeholder={{ color: "gray.500" }}
                type="language"
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
              >
                Save
              </Button>
              <Button
                bg={"red.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "red.500",
                }}
                onClick={onClose}
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </ModalContent>
    </Modal>
  );
};

export default UserEditModal;
