import React, { useState, useRef } from 'react'
import "./createpost.modules.css"
import { BsUpload } from "react-icons/bs";
import { Box, Button, Flex, FormControl, FormLabel, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react';
import { MdUpload } from "react-icons/md";
import { Input } from '@chakra-ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { updatePost } from '../../Redux/Post/post.actions';
import axios from 'axios';
import UseToastMsg, { ToastType } from '../../Custom-Hooks/Toast';
import { RootState } from '../../Redux/store';
import { IPost } from '../../Constants/constant';
import { IoCloudDone } from 'react-icons/io5';

interface props {
     post: IPost,
     isOpen: boolean,
     onOpen: () => void,
     onClose: () => void
}

function UpdatePost({ post, isOpen, onOpen, onClose }: props) {
     const { Toast } = UseToastMsg();
     const [title, setTitle] = useState(post.title);
     const [description, setDescription] = useState(post.description);
     const [imageFile, setImageFile] = useState<any>([]);
     const [error, setError] = useState<boolean>(false)
     const dispatch: Dispatch<any> = useDispatch()
     const { userCredential } = useSelector((store: RootState) => store.auth)

     const onUpdatePost = () => {


          if (!imageFile.length) return UpadateTitleandDescription()

          if (title == "" || description == "") {
               return setError(true)
          } else {
               setError(false)
          }

          const form = new FormData();
          form.append("file", imageFile[0]);
          form.append("upload_preset", "sfunzr0m")
          form.append("cloud_name", "dpzbtnmfl")

          fetch("https://api.cloudinary.com/v1_1/dpzbtnmfl/image/upload", {
               method: "POST",
               body: form
          })
               .then((res) => res.json())
               .then(res => {
                    const data = {
                         title: title,
                         description: description,
                         content: res.secure_url,
                    }
                    dispatch(updatePost(post._id, data))
                    onClose()
               })
               .catch((err) => {
                    console.log(err)
               })
     }

     const UpadateTitleandDescription = () => {
          dispatch(updatePost(post._id, { title, description }))
     }

     return (
          <>
               <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                         <ModalHeader>Update your Post</ModalHeader>
                         <ModalCloseButton />
                         <ModalBody pb={2}>
                              <Stack spacing={'10px'}>
                                   <Box>
                                        <Image src={post.content} objectFit={'contain'} objectPosition='center' />
                                   </Box>
                                   {(imageFile && imageFile.length) ?
                                        <Flex align={'center'} justify='space-between' borderRadius={'5px'} bg='green.200' color={'blackAlpha.800'} fontWeight='semibold' w='100%' p='2' px='4' border={'1px'} borderColor='gray.200'>
                                             File Uploaded
                                             <Text as='span'><IoCloudDone /></Text>
                                        </Flex>
                                        :
                                        <FormControl className='image-input' _hover={{ bg: "#307eff" }}>
                                             <FormLabel gap='10px' justifyContent={'center'} display={'flex'} className='image-input-label' alignItems='center'><MdUpload />Upload new Image</FormLabel>
                                             <Input type='file' visibility={'hidden'} onChange={e => setImageFile(e.target?.files)} />
                                        </FormControl>
                                   }
                                   <FormControl >
                                        <FormLabel>Title</FormLabel>
                                        <Input placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} />
                                   </FormControl>
                                   <FormControl >
                                        <FormLabel>Description</FormLabel>
                                        <Textarea placeholder='Description' value={description} onChange={e => setDescription(e.target.value)} />
                                   </FormControl>
                              </Stack>
                              {error && <Box className='post-error' color={'red.300'} letterSpacing='1px'>
                                   <Text>Please fill all fields</Text>
                              </Box>}
                         </ModalBody>
                         <ModalFooter>
                              <Button onClick={onUpdatePost} colorScheme='#025bee' _hover={{ bg: "#307eff" }} bg='#025bee' mr={3}>
                                   Save Post
                              </Button>
                              <Button onClick={onClose}>Cancel</Button>
                         </ModalFooter>
                    </ModalContent>
               </Modal>
          </>
     )
}

export default UpdatePost