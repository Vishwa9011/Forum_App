import React from 'react'

function useToggle(initial = false) {
     const [state, setState] = React.useState<boolean>(initial);

     function onToggle() {
          setState(!state);
     }

     return [state, onToggle,]
}

export default useToggle