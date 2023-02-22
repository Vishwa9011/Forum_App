import React from 'react'
import "./createpost.modules.css"
import { BsUpload } from "react-icons/bs";
import { Box, Button, Flex, FormControl, FormLabel } from '@chakra-ui/react';

import { Input } from '@chakra-ui/input';
function Createpost() {
  return (
    <>
    <div id="postmain">
      <div id="filepost">
        <div id="postimg">
          <img src="https://cdn.pixabay.com/photo/2018/08/14/13/23/ocean-3605547__340.jpg" alt="" width={"100%"}/>
        </div>
        <div style={{display:"flex", justifyContent:"center",alignItems:"center"}}>
        <input type="file" name="file" id="file" className="inputfile" />
      <label htmlFor="file" id='labelup'><BsUpload/>Choose a file</label>
        </div>
      </div>
      <div id="descriptionpost">
            <div id="decdiv1">
            <FormControl id="text" isRequired>
              <FormLabel>Title</FormLabel>
              <Input type="text" />
            </FormControl>
            
            <FormControl id="text" isRequired>
              <FormLabel>Description</FormLabel>
              <textarea rows={12} cols={68} id="textarea">  
              </textarea>
            </FormControl>
            
            </div>
            <div style={{width:"80%",margin:"auto",display:"flex",justifyContent:"flex-end", alignItems:"center"}}>
            <Button size="md" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }}>Save</Button>
            </div>
      </div>
    </div>
    </>
  )
}

export default Createpost