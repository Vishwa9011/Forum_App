import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Post from "../Post/Post";

type Props = {};

function Home({ }: Props) {
  return (
    <>
      <Navbar />
      <Box>
        <Post />
      </Box>
    </>
  );
}

export default Home;
