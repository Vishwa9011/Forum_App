import { Box, Button, Flex, Text, Textarea } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Dispatch } from 'redux';
import { createComment } from '../../../Redux/Post/post.actions';
import { RootState } from '../../../Redux/store';

type Props = {
     autoFocus: boolean,
     onSubmit: (message: string) => void,
     initialValue?: string
}

function CommentForm({ onSubmit, autoFocus, initialValue = '' }: Props) {
     const navigate = useNavigate();
     const [message, setMessage] = useState<string>(initialValue);
     const [Error, setError] = useState<boolean>(false);
     const { loading } = useSelector((store: RootState) => store.post);
     const { userCredential } = useSelector((store: RootState) => store.auth)

     const CreateComment = (e: FormEvent) => {
          e.preventDefault();
          if (!userCredential?._id) {
               return navigate("/login")
          }

          if (!message) return setError(true)

          onSubmit(message)
          setMessage("");
     }

     return (

          <Box>
               <form onSubmit={CreateComment}>
                    <Flex h='100%' gap='10px'>
                         <Textarea autoFocus={autoFocus} placeholder='Add a reply...' value={message} onChange={e => setMessage(e.target.value)} />
                         <Button h='' type='submit' isLoading={loading} variant='solid' className='btn btn-click' bg='cyan.500' color={'white'} colorScheme={'cyan.600'}>Post</Button>
                    </Flex>
                    {Error && <Box className='post-error' color={'red.300'} pl='1' fontSize={'.8em'} letterSpacing='1px'>
                         <Text>Please write something...</Text>
                    </Box>}
               </form>
          </Box >
     )
}

export default CommentForm