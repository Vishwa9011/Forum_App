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
			<Box w="88%" h='120vh' m="auto" display="flex" gap="5">
				<Box w='25%' display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
					<LeftCompo />
				</Box>
				<Box flex={1} h='100%' overflowY={'scroll'} className='scroll-hidden'><Post /></Box>
				<Box w='25%' display={{ base: "none", sm: "none", md: "none", lg: "block" }}>
					<RightCompo />
				</Box>
			</Box>
		</>
	);
}

export default Home;
