import { Avatar, Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import React from "react";
import UserCard from "./UserCard";

type Props = {};

function UserProfile({ }: Props) {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
        mr={4}
      >
        <Avatar bg="teal.500" size={"sm"} name="Ashok Prajapati" src={"#"} />
      </MenuButton>
      <MenuList>
        <UserCard />
      </MenuList>
    </Menu>
  );
}

export default UserProfile;
