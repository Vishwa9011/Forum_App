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

import { Link } from "react-router-dom";

function UserCard() {
  return (
    <Card maxW="sm">
      <CardHeader>
        <Flex gap={"4"}>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar bg={"red.500"} name="Ashok Kumar" src="#" />

            <Box>
              <Heading size="sm">Ashok Kumar</Heading>
              <Text>Full Stack Web developer</Text>
            </Box>
          </Flex>
        </Flex>
        <Button
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
