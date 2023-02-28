import React from 'react'
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, Image, Box, Flex, Text, Avatar, } from '@chakra-ui/react'
import { CalcTime } from '../../helper/helper'
import { IUser } from '../../Constants/constant'
import { Link } from 'react-router-dom';

type Props = {
     users: IUser[],
     toggle(): void
}

const SearchTable = ({ users, toggle }: Props) => {
     return (
          <TableContainer bg='whiteAlpha.800'>
               <Table variant='simple'>
                    <Tbody>
                         {users && users.map((user) => (
                              <Tr borderBottom={'1px'} p='' key={user._id}>
                                   <Td _hover={{ bg: "gray.300" }}>
                                        <Flex as={Link} to={`/user/${user._id}`} onClick={toggle} align={'center'} p='' gap={'3'}>
                                             <Box className={user?.online ? 'online' : "offline"}>
                                                  <Box className='post-header-image'>
                                                       <Avatar boxSize='100%' name={user?.username} bg={"blue.500"} src={user?.photoURL} css={{ border: "2px solid white" }} />
                                                  </Box>
                                             </Box>
                                             <Box w='180px' overflow={'hidden'} lineHeight='1.2'>
                                                  <Text whiteSpace={'nowrap'} fontWeight='semibold' cursor={'pointer'} textTransform={"capitalize"} _hover={{ textDecor: "underline" }}>{user.username}</Text>
                                                  <Text whiteSpace={'nowrap'} fontSize='.8em' className='text-elipsis' textTransform={"capitalize"}>{user.email} </Text>
                                                  <Text fontSize='.7em' color='blackAlpha.700'>
                                                       <Text as='span'>{user?.online ? "online" : `${CalcTime(user?.lastLogin)} offline`}</Text>
                                                  </Text>
                                             </Box>
                                        </Flex>
                                   </Td>
                              </Tr>
                         ))}
                    </Tbody>
               </Table>
          </TableContainer>
     )


}

export default SearchTable