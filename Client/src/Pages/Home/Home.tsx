import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import LeftCompo from "./LeftCompo";
import RightCompo from "./RightCompo";
import Post from "../Post/Post";


type Props = {};

function Home({ }: Props) {
  return (
    <>
      <Navbar />
      <Box w="88%" m="auto" display="grid" gridTemplateColumns={{base:"repeat(0,1fr)",sm:"repeat(0,1fr)",md:"repeat(0,1fr)",lg:"repeat(3,1fr)"}} gap="10">
        <Box >
        <LeftCompo/>
        </Box>
        <Box ><Post /></Box>
        <Box >
        <RightCompo/>
        </Box>
      </Box>
    </>
  );
}

export default Home;
