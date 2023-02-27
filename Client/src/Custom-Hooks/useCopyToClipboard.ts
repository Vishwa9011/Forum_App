import copy from 'copy-to-clipboard';
import React, { useState } from 'react'

function useCopyToClipboard() {
     const [value, setValue] = useState<string>('');
     const [success, setSuccess] = useState<boolean>()

     const copyToClipboard = (text: string, options: any) => {
          const result = copy(text, options)
          console.log('result: ', result);
          if (result) setValue(text)
          setSuccess(result)
     }

     return [copyToClipboard, { value, success }]
}

export default useCopyToClipboard