import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { Dispatch } from "redux";
import UseToastMsg from "../../Custom-Hooks/Toast";
import { logout } from "../../Redux/Auth/auth.actions";
import { RootState } from "../../Redux/store";

function UserCard() {
  const dispatch: Dispatch<any> = useDispatch();
  const { userCredential } = useSelector((store: RootState) => ({
    ...store.auth,
  }));
  const { Toast, Type } = UseToastMsg();
  const navigate = useNavigate();

  const signout = () => {
    if (!userCredential.email) {
      return Toast("Email is missing", Type.info);
    }
    dispatch(logout(userCredential.email, Toast, navigate));
  };

  return (
    <Card maxW="sm">
      <CardHeader>
        <Flex gap={"4"}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              bg={"red.500"}
              name={userCredential.username}
              src={userCredential.photoURL}
            />

            <Box>
              <Heading size="sm">{userCredential.username}</Heading>
              <Text>{userCredential.occupation}</Text>
            </Box>
          </Flex>
        </Flex>
        <Button
          as={Link}
          to="/profile"
          mt={4}
          w="100%"
          size="xs"
          border="1px solid blue"
          borderRadius={"10px"}
        >
          View Profile
        </Button>
      </CardHeader>
      <hr />
      <CardBody>
        <Stack divider={<StackDivider />} spacing="4">
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Account
            </Heading>
            <Flex flexDir={"column"}>
              <Text as={Link} to="/" pt="2" fontSize="sm">
                Setting & Privacy
              </Text>
              <Text as={Link} to="/" pt="2" fontSize="sm">
                Help
              </Text>
              <Text as={Link} to="/" pt="2" fontSize="sm">
                Language
              </Text>
            </Flex>
          </Box>
          <Box>
            <Heading size="xs" textTransform="uppercase">
              Manage
            </Heading>
            <Flex flexDir={"column"}>
              {" "}
              <Text as={Link} to="/" pt="2" fontSize="sm">
                Post & Activity
              </Text>
              <Text as={Link} to="/" pt="2" fontSize="sm">
                Job Posting Account
              </Text>
              <Text as={Link} to="/" pt="2" fontSize="sm">
                Masai School
              </Text>
            </Flex>
          </Box>
          <Button
            w="100%"
            size="xs"
            border="1px solid blue"
            borderRadius={"10px"}
            onClick={signout}
          >
            Sign Out
          </Button>
        </Stack>
      </CardBody>

      {/* <CardFooter justify="center">
       
      </CardFooter> */}
    </Card>
  );
}

export default UserCard;
