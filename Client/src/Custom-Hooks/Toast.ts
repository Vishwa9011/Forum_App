import React from 'react'
import { useToast } from '@chakra-ui/react'


export const ToastType = {
     info: "info",
     warning: "warning",
     success: "success",
     error: "error",
     loading: "loading"
}

interface IStatus {
     status: "info" | "warning" | "success" | "error" | "loading" | undefined
}

const UseToastMsg = () => {
     const toast = useToast();
     const Toast = (msg: string, status: any) => {
          toast(
               {
                    title: `${msg}`,
                    position: 'top-right',
                    variant: 'left-accent',
                    isClosable: true,
                    duration: 5000,
                    status,
               }
          )
     }
     return { Toast, Type: ToastType }
}

export default UseToastMsg