import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useRef, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import "./SearchBar.css";
import SearchTable from "./SearchTable";

type Props = { toggle(): void };

function SearchPopup({ toggle }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { posts } = useSelector((store: RootState) => store.post);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <>
      <Box
        pos="fixed"
        w="100%"
        height={"100vh"}
        zIndex={"999"}
        className="search-main-container"
      >
        <Box pos={"relative"} w="100%" h="100%">
          <Box
            className="search-input"
            display="flex"
            justifyContent={"center"}
          >
            <Box
              w={{ base: "100%", sm: "100%", md: "40em" }}
              m="auto"
              className="search-container"
            >
              <Flex
                alignItems={"center"}
                bg="white"
                justifyContent="flex-start"
                gap="10px"
                padding={"15px"}
                borderRadius="10px"
                color="#000"
              >
                <Button
                  variant={"unstyled"}
                  className="btn-clicked"
                  color={"red.500"}
                  fontSize="1.5rem"
                  ml="10px"
                  fontWeight={"extrabold"}
                >
                  <BsSearch />
                </Button>
                <Box w="100%">
                  <Input
                    placeholder="Search"
                    ref={inputRef}
                    variant="unstyled"
                    // onChange={FilterData}
                    // value={searchText}
                  />
                </Box>
              </Flex>
              <Box>
                {posts.length ? (
                  <Box maxH="50vh" overflowY={"scroll"}>
                    <SearchTable posts={posts} />
                  </Box>
                ) : null}
              </Box>
            </Box>
            <Box
              className="search-overlay"
              bg="transparent"
              onClick={toggle}
            ></Box>
          </Box>
          <Box className="search-overlay" onClick={toggle}></Box>
        </Box>
      </Box>
    </>
  );
}

export default SearchPopup;
