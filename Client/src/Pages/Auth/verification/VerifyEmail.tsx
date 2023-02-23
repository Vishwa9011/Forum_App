import React, { useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate } from "react-router-dom";
import UseToastMsg from "../../../Custom-Hooks/Toast";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { verifyemail } from "../../../Redux/Auth/auth.actions";

type Props = {};

function VerifyEmail() {
  const dispatch: Dispatch<any> = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const credential = searchParams.get("credential");
  const { Toast, Type } = UseToastMsg();
  const navigate = useNavigate();
  useEffect(() => {
    if (credential) {
      dispatch(verifyemail(credential, Toast, navigate));
    }
  }, [credential]);

  return (
    <Box textAlign="center" py={10} px={6}>
      <InfoIcon boxSize={"50px"} color={"green.500"} />
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Please Wait...
      </Heading>
      <Text color={"gray.500"}>
        We are verifying you email and will redirect you to website.
      </Text>
    </Box>
  );
}

export default VerifyEmail;
