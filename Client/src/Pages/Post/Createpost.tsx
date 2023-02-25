import React, { useState, useRef } from 'react'
import "./createpost.modules.css"
import { Box, Button, Flex, FormControl, FormLabel, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, Textarea } from '@chakra-ui/react';
import { MdUpload } from "react-icons/md";
import { IoCloudDone } from "react-icons/io5";
import { Input } from '@chakra-ui/input';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createPost } from '../../Redux/Post/post.actions';
import axios from 'axios';
import UseToastMsg, { ToastType } from '../../Custom-Hooks/Toast';
import { RootState } from '../../Redux/store';
import useToggle from '../../Custom-Hooks/useToggle';
import { Navigate, useNavigate } from 'react-router-dom';

function Createpost() {
   const { Toast } = UseToastMsg();
   const navigate = useNavigate()
   const titleRef = useRef<HTMLInputElement>(null)
   const descRef = useRef<HTMLTextAreaElement>(null)
   const [ImageFile, setImageFile] = useState<any>([])
   const [isOpen, onOpen, onClose]: any = useToggle(false)
   const [Error, setError] = useState<boolean>(false)
   const dispatch: Dispatch<any> = useDispatch()
   const { userCredential } = useSelector((store: RootState) => store.auth)

   const onCreatePost = () => {

      if (!titleRef.current?.value || !descRef.current?.value || !ImageFile.length) {
         const data = {
            title: titleRef.current!.value,
            description: descRef.current!.value,
            content: ImageFile[0],
            author: userCredential._id,
            authorID: userCredential._id
         }
         return setError(true);
      } else {
         setError(false);
      }

      const form = new FormData();
      form.append("file", ImageFile[0]);
      form.append("upload_preset", "sfunzr0m")
      form.append("cloud_name", "dpzbtnmfl")

      fetch("https://api.cloudinary.com/v1_1/dpzbtnmfl/image/upload", {
         method: "POST",
         body: form
      })
         .then((res) => res.json())
         .then(res => {
            const data = {
               title: titleRef.current!.value,
               description: descRef.current!.value,
               content: res.secure_url,
               author: userCredential._id,
               authorID: userCredential._id
            }
            console.log('data: ', data);
            dispatch(createPost(data))
            onClose()
         })
         .catch((err) => {
            console.log(err)
         })
   }

   function openCreatPost() {
      if (!userCredential._id) {
         return navigate("/login")
      }
      onOpen()
   }

   return (
      <>
         <Flex p='2' my='5' gap='20px' justify={'space-between'} border='1px' borderColor={'gray.400'} borderRadius={'5px'}>
            <Box className='create-post-image'>
               <Image src={userCredential.photoURL || "https://bit.ly/3kkJrly"} />
            </Box>
            <Button variant={'outline'} w='100%' borderRadius={'10px'} onClick={openCreatPost} color={''}>Create Post</Button>
         </Flex>

         <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
               <ModalHeader>Create your Post</ModalHeader>
               <ModalCloseButton />
               <ModalBody pb={2}>
                  <Stack spacing={'10px'}>
                     {(ImageFile && ImageFile.length) ?
                        <Flex align={'center'} justify='space-between' borderRadius={'5px'} bg='green.200' color={'blackAlpha.800'} fontWeight='semibold' w='100%' p='2' px='4' border={'1px'} borderColor='gray.200'>
                           File Uploaded
                           <Text as='span'><IoCloudDone /></Text>
                        </Flex>
                        :
                        <FormControl className='image-input' _hover={{ bg: "#307eff" }}>
                           <FormLabel gap='10px' justifyContent={'center'} display={'flex'} className='image-input-label' alignItems='center'><MdUpload />Choose the Image</FormLabel>
                           <Input type='file' onChange={e => setImageFile(e.target.files)} visibility={'hidden'} />
                        </FormControl>
                     }
                     <FormControl >
                        <FormLabel>Title</FormLabel>
                        <Input placeholder='Title' ref={titleRef} />
                     </FormControl>
                     <FormControl >
                        <FormLabel>Description</FormLabel>
                        <Textarea placeholder='Description' ref={descRef} />
                     </FormControl>
                  </Stack>
                  {Error && <Box className='post-error' color={'red.300'} letterSpacing='1px'>
                     <Text>Please fill all fields</Text>
                  </Box>}
               </ModalBody>
               <ModalFooter>
                  <Button onClick={onCreatePost} colorScheme='#025bee' _hover={{ bg: "#307eff" }} bg='#025bee' mr={3}>
                     Create Post
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   )
}

export default Createpost