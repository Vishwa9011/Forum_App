import { Box, Flex, Select, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, Dispatch, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IUser } from '../../../Constants/constant'
import UseToastMsg from '../../../Custom-Hooks/Toast'
import { CalcTime } from '../../../helper/helper'
import { RootState } from '../../../Redux/store'

type Props = {}

interface IUsersProp {
     users: IUser[],
     loading: boolean
}

const Dashboard = (props: Props) => {
     const { Toast } = UseToastMsg();
     const dispatch: Dispatch<any> = useDispatch();
     const [users, setUsers] = useState([]);

     async function getQuerry() {
          try {
               const users = await axios.get(`/user?user=${''}`);
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
                                        <Th>UserID</Th>
                                        <Th>Email</Th>
                                        <Th>
                                             <Select cursor={'pointer'}>
                                                  <option defaultValue={'true'} value="all">All</option>
                                                  <option value="active">Active</option>
                                                  <option value="passive">Passive</option>
                                             </Select>
                                        </Th>
                                   </Tr>
                              </Thead>
                              <Tbody>
                                   {users.map((user: IUser, i: number) => (
                                        <Tr key={user._id} _hover={{ bg: 'gray.200' }} cursor='pointer'>
                                             <Td>{i + 1}</Td>
                                             <Td fontWeight={'semibold'} opacity='.8'>
                                                  <Flex flexDir={'column'}>
                                                       {user._id}
                                                       <Text fontSize={'.7em'} color='red.500' style={{ fontStyle: 'italic' }}>createdAt: {CalcTime(user.createdAt)}</Text>
                                                  </Flex>
                                             </Td>
                                             <Td>{user.email}</Td>
                                             <Td fontWeight={'semibold'} color={user.online ? "green.500" : 'red.500'}>{user.online ? "ACTIVE" : 'PASSIVE'}</Td>
                                        </Tr>
                                   ))}
                              </Tbody>
                         </Table>
                    </TableContainer>
               </Box>
          </Box>
     )
}

export default Dashboard 