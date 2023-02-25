import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";
import useToggle from "../../Custom-Hooks/useToggle";
import SearchPopup from "./SearchPopup";

type Props = { toggleSearchBar(): void };

function SearchBar({ toggleSearchBar }: Props) {
  return (
    <>
      <InputGroup
        mr="4"
        size="md"
        display={{ base: "none", md: "flex" }}
        onClick={toggleSearchBar}
      >
        <Input placeholder="Search" />
        <InputRightElement>
          <IconButton aria-label="Search database" icon={<SearchIcon />} />
        </InputRightElement>
      </InputGroup>
    </>
  );
}

export default SearchBar;
