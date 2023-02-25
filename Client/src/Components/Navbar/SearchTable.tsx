import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Image,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { IPost } from "../../Constants/constant";

type Props = {
  posts: IPost[];
};

const SearchTable = ({ posts }: Props) => {
  return (
    <TableContainer bg="whiteAlpha.700" borderRadius={"lg"}>
      <Table variant="simple">
        {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
        <Thead>
          <Tr>
            <Th>Post</Th>
            <Th>Title</Th>
            <Th>Likes</Th>
            <Th>Comments</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.length
            ? posts.map((post: IPost) => (
                <Tr key={post._id}>
                  <Td>
                    <Link
                      to={`/singlepost/${post._id}`}
                      className="search-list"
                    >
                      <Image src={post.content} boxSize="40px" />
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`/singlepost/${post._id}`}
                      className="search-list"
                    >
                      {post.title}
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`/singlepost/${post._id}`}
                      className="search-list"
                    >
                      10
                    </Link>
                  </Td>
                  <Td>
                    <Link
                      to={`/singlepost/${post._id}`}
                      className="search-list"
                    >
                      {post.description.slice(0, 15)}
                    </Link>
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default SearchTable;
