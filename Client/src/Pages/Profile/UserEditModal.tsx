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
  Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { IUser } from "../../Constants/constant";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { updateUser } from "../../Redux/Auth/auth.actions";
import { Dispatch } from "redux";
import UseToastMsg from "../../Custom-Hooks/Toast";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UserEditModal = ({ isOpen, onClose }: Props) => {
  const { userCredential, loading } = useSelector(
    (store: RootState) => store.auth
  );
  const { Toast } = UseToastMsg();
  const [userData, setUserData] = React.useState(userCredential);
  const dispatch: Dispatch<any> = useDispatch();

  const { username, gender, phoneNumber, photoURL, bio, occupation } = userData;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    setUserData({ ...userData, [e.target.name]: val });
  };

  const handleUpdate = () => {
    dispatch(updateUser(userData, onClose, Toast));
  };

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
            <FormControl id="user" w="min-content">
              <FormLabel>User Icon</FormLabel>
              <Stack direction={["column", "row"]} spacing={6}>
                <Center>
                  <Avatar
                    size="xl"
                    bg="blue.500"
                    name={username}
                    src={photoURL}
                  >
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
                  name="username"
                  value={username}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl width={"100%"} id="gender">
                <FormLabel>Gender</FormLabel>
                <Select name="gender" value={gender} onChange={handleChange}>
                  <option value="">Select Gender</option>
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
                  name="phoneNumber"
                  value={phoneNumber}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="role" isRequired>
                <FormLabel>Occupation</FormLabel>
                <Select
                  name="occupation"
                  value={occupation}
                  onChange={handleChange}
                >
                  <option value="">Select Occupation</option>
                  <option value="student">Student</option>
                  <option value="engineer">Engineer</option>
                </Select>
              </FormControl>
            </Flex>
            <FormControl id="bio">
              <FormLabel>Bio</FormLabel>
              <Textarea
                placeholder="Write our bio"
                _placeholder={{ color: "gray.500" }}
                name="bio"
                value={bio}
                onChange={handleChange}
              />
            </FormControl>
            <Stack spacing={6} direction={["column", "row"]}>
              <Button
                isLoading={loading}
                loadingText="Updating..."
                bg={"blue.400"}
                color={"white"}
                w="full"
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleUpdate}
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
