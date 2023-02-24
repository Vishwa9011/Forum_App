import React from "react";
import { Box, Button, Container, Heading, Stack, Text } from "@chakra-ui/react";
import "./verify.modules.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import UseToastMsg from "../../../Custom-Hooks/Toast";
import { sendVerifyEmail } from "../../../Redux/Auth/auth.actions";
import { Dispatch } from "redux";

const SendVerificationEmail = () => {
  const { Toast, Type } = UseToastMsg();
  const { email, password } = useSelector(
    (store: RootState) => store.auth.userCredential
  );
  console.log("email, password: ", email, password);

  const dispatch: Dispatch<any> = useDispatch();

  const handleVerify = () => {
    if (!email || !password) {
      return Toast("Email or password is missing", Type.info);
    }
    dispatch(sendVerifyEmail(email, password, Toast));
  };

  return (
    <Stack h="100vh" justifyContent={"center"} alignItems="center">
      <Container maxW="5xl">
        <div id="main_verify">
          <div>
            <div id="img1verify">
              <img
                src="https://media.istockphoto.com/id/1303742901/vector/email-marketing-message-concept.jpg?b=1&s=170667a&w=0&k=20&c=rJ34uzQc90Zfzh1Bf0KgizDizGPrjAkjaVS8jd_RsSg="
                alt=""
                width={"100%"}
              />
            </div>
            <div id="mail">
              <Heading id="verifyh1">Verify Your Email Address</Heading>
              <p>Please verify the email by clicking the button below</p>
              <Box>
                <Button
                  bg={"orange"}
                  color={"white"}
                  _hover={{ bg: "#ff6703", color: "white" }}
                  onClick={handleVerify}
                >
                  Send Verification Email
                </Button>
              </Box>
              <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                We're looking for amazing personality just like you! Become a
                part of our Forum team and skyrocket your way!
              </Text>
            </div>
          </div>
        </div>
      </Container>
    </Stack>
  );
};

export default SendVerificationEmail;
