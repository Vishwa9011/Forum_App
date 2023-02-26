import { Box, Button, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tooltip, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import { IUser } from '../../../Constants/constant'
import UseToastMsg from '../../../Custom-Hooks/Toast'
import useToggle from '../../../Custom-Hooks/useToggle'
import { CalcTime } from '../../../helper/helper'
import { Link } from 'react-router-dom';

type Props = {}

interface IUsersProp {
     users: IUser[],
     loading: boolean
}
const Users = (props: Props) => {
     const { Toast } = UseToastMsg();
     const dispatch: Dispatch<any> = useDispatch();
     const [users, setUsers] = useState([]);
     const [userProfile, setUserProfile] = useState<any>()
     const [IsShowProfile, showProfile, hideProfile]: any = useToggle(false)

     async function getQuerry() {
          try {
               const users = await axios.get(`/user`);
               setUsers(users.data.users);
          } catch (error) {
               console.log('error: ', error);
          }
     }

     useEffect(() => {
          getQuerry()
     }, [])

     return (
          <Box>

               <Box>
                    <TableContainer>
                         <Table variant='simple'>
                              <TableCaption>Imperial to metric conversion factors</TableCaption>
                              <Thead>
                                   <Tr>
                                        <Th>S.no</Th>
                                        <Th>Username</Th>
                                        <Th>Email</Th>
                                        <Th>
                                             <Select cursor={'pointer'}>
                                                  <option defaultValue={'true'} value="all">All</option>
                                                  <option value="active">Active</option>
                                                  <option value="passive">Passive</option>
                                             </Select>
                                        </Th>
                                        <Th>Details</Th>
                                        <Th>Delete</Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {users.map((user: IUser, i) => (
                                        <Tr key={user._id} _hover={{ bg: 'gray.200' }} cursor='pointer'>
                                             <Td>{i + 1}</Td>
                                             <Td fontWeight={'semibold'} opacity='.8'>
                                                  <Tooltip hasArrow label={`_id: ${user._id}`}>
                                                       <Flex flexDir={'column'}>
                                                            {user.username}
                                                            <Text fontSize={'.7em'} color='cyan.500' style={{ fontStyle: 'italic' }}>createdAt: {CalcTime(user.createdAt)}</Text>
                                                       </Flex>
                                                  </Tooltip>
                                             </Td>
                                             <Td>
                                                  <Tooltip hasArrow label={`_id: ${user._id}`}>
                                                       {user.email}
                                                  </Tooltip>
                                             </Td>
                                             <Td fontWeight={'semibold'} color={user.online ? "green.500" : 'red.500'}>{user.online ? "ACTIVE" : 'PASSIVE'}</Td>
                                             <Td>
                                                  <Tooltip hasArrow label={"View User Details"}>
                                                       <Button as={Link} to={`/user/${user._id}`} border={'2px'} borderRadius='0' fontWeight={'semibold'} color={'blue.500'} onClick={() => { showProfile(); setUserProfile(user) }}>VIEW USER</Button>
                                                  </Tooltip>
                                             </Td>
                                             <Td>
                                                  <Tooltip hasArrow label={"Delete User"}>
                                                       <Button border={'2px'} borderRadius='0' fontWeight={'semibold'} color={'red.500'}>DELETE USER</Button>
                                                  </Tooltip>
                                             </Td>
                                        </Tr>
                                   ))}
                              </Tbody>
                         </Table>
                    </TableContainer>
               </Box>
          </Box>

     )
}

export default Users