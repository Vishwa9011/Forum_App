import { SearchIcon } from "@chakra-ui/icons";
import {
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React from "react";

type Props = {};

function SearchBar({}: Props) {
  return (
    <InputGroup mr="4" size="md" display={{ base: "none", md: "flex" }}>
      <Input placeholder="Search" />
      <InputRightElement>
        <IconButton aria-label="Search database" icon={<SearchIcon />} />
      </InputRightElement>
    </InputGroup>
  );
}

export default SearchBar;
