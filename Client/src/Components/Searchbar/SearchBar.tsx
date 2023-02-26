import { Box, Button, Input, Select, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState, useEffect, Dispatch, useRef } from 'react'
import { BsSearch } from "react-icons/bs"
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { IUser } from '../../Constants/constant'
import useToggle from '../../Custom-Hooks/useToggle'
import { RootState } from '../../Redux/store'
import './SearchBar.css'
import SearchTable from './SearchTable'

const categoryList = ['Men', 'Women', 'Kids', 'Home', 'Beauty']

interface IProps {
     toggle(): void
}

const SearchBar = ({ toggle }: IProps) => {
     const [searchParams, setSearchParams] = useSearchParams();
     const [users, setUsers] = useState([]);
     const [searchText, setSearchText] = useState<string>(() => searchParams.get('user') || '');

     let id: any;
     useEffect(() => {
          id = setTimeout(getQuerry, 500);
          setSearchParams({ user: searchText });

          return () => clearTimeout(id)
     }, [searchText])

     async function getQuerry() {
          try {
               const users = await axios.get(`/user?user=${searchText}`);
               console.log('users: ', users);
               setUsers(users.data.users);
          } catch (error) {
               console.log('error: ', error);
          }
     }

     return (
          <Box pos='fixed' w='100%' height={'100vh'} zIndex={'999'} className='search-main-container'>
               <Box pos={'relative'} w='100%' h='100%' >
                    <Box className='search-input' display='flex' justifyContent={'center'}>
                         <Box w={{ base: "100%", sm: "100%", md: '40em' }} m='auto' className='search-container'>
                              <Box display={'flex'} border='1px' alignItems={'center'} bg='gray.900' justifyContent='space-between' gap='10px' padding={'10px'} borderRadius='10px'>
                                   <Button variant={'unstyled'} className='btn-clicked' color={'red.500'} fontSize='1.5rem' ml='10px' fontWeight={'extrabold'}>
                                        <BsSearch />
                                   </Button>
                                   <Box border={'1px'} color='white' alignSelf={'stretch'} ml='10px'></Box>
                                   <Box w='100%'>
                                        <Input autoFocus={true} placeholder='Search for products, brand and more' variant='unstyled' onChange={e => setSearchText(e.target.value)} value={searchText} />
                                   </Box>
                              </Box>
                              <Box>
                                   <Box maxH='50vh' overflowY={'scroll'}>
                                        <SearchTable users={users} />
                                   </Box>
                              </Box>
                         </Box>
                         <Box className='search-overlay' bg='transparent' onClick={toggle}></Box>
                    </Box>
                    <Box className='search-overlay' onClick={toggle}></Box>
               </Box>
          </Box >
     )
}

export default React.memo(SearchBar)