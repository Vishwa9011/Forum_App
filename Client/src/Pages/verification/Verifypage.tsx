
import React from 'react'
import { Button, Heading, Text } from '@chakra-ui/react'
import "./verify.modules.css"

const Verifypage = () => {
  return (
    <>
        <div id="main_verify">
            <div>
                <div id="img1verify"><img src="https://media.istockphoto.com/id/1303742901/vector/email-marketing-message-concept.jpg?b=1&s=170667a&w=0&k=20&c=rJ34uzQc90Zfzh1Bf0KgizDizGPrjAkjaVS8jd_RsSg=" alt="" width={"100%"}/></div>
                <div id="mail">
                <Heading id="verifyh1">Verify Your Email Address</Heading>
                <p>Please verify the email by clicking the button below</p>
                <Button bg={'#ff6703'}
                color={'white'}
                _hover={{
                bg: 'white',
                color: "black",
                border:"2px solid #4299e1"
                }}>Send Verification to your Email</Button>

                <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
                We’re looking for amazing personality just like you! Become a part
                of our Forum team and skyrocket your way!
            </Text>
                </div>
            </div>
        </div>
    </>
  )
}

export default Verifypage