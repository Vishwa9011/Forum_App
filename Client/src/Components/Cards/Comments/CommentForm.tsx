import { Box, Button, Flex, Textarea } from '@chakra-ui/react'
import React, { FormEvent, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createComment } from '../../../Redux/Post/post.actions';
import { RootState } from '../../../Redux/store';

type Props = {
     autoFocus: boolean,
     onSubmit: (message: string) => void
}

function CommentForm({ onSubmit, autoFocus }: Props) {

     const [message, setMessage] = useState<string>('');
     const { loading } = useSelector((store: RootState) => store.post);
     const dispatch: Dispatch<any> = useDispatch()

     const CreateComment = (e: FormEvent) => {
          e.preventDefault();
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
               </form>
          </Box >
     )
}

export default CommentForm