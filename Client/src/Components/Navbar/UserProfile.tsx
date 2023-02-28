import { Avatar, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import UserCard from "./UserCard";

type Props = {};

function UserProfile({ }: Props) {
  const { userCredential } = useSelector((store: RootState) => store.auth);
  return (
    <Menu>
      <MenuButton as={Button} rounded={"full"} variant={""} cursor={"pointer"} minW={0} mr={4}>
        <Avatar bg="purple.400" color='blackAlpha.800' boxSize={"40px"} name={userCredential.username} src={userCredential.photoURL} />
      </MenuButton>
      <MenuList>
        <UserCard />
      </MenuList>
    </Menu>
  );
}

export default UserProfile;
