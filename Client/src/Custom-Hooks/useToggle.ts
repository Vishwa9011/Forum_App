import React from 'react'

function useToggle(initial = false) {
     const [state, setState] = React.useState<boolean>(initial);

     function onClose() {
          setState(false);
     }

     function onOpen() {
          setState(true)
     }

     return [state, onOpen, onClose]
}

export default useToggle