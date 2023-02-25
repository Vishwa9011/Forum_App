import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { useRef, useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { IPost, IUser } from "../../Constants/constant";
import { RootState } from "../../Redux/store";
import "./SearchBar.css";
import SearchTable from "./SearchTable";

type Props = { toggle(): void };

function SearchPopup({ toggle }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { posts } = useSelector((store: RootState) => store.post);
  const [filteredData, setFilteredData] = useState<IPost[]>([]);
  const [searchText, setSearchText] = useState("");

  const FilterData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value.toLowerCase());
    const searchText = e.target.value.toLowerCase();
    const filteredDataFromSearchData = searchData.filter(
      (post: IPost) =>
        item.bran.toLowerCase().includes(searchText) ||
        item.description.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText)
    );
    setFilteredData(filteredDataFromSearchData);
  };

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
                padding={"10px"}
                borderRadius="10px"
                color="#000"
                my={4}
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
                    onChange={FilterData}
                    value={searchText}
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
