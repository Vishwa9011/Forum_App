import React from 'react'
import './IconBtn.css'
type Props = {}

function IconBtn({ Icon, isActive, color, children, ...props }: any) {
     return (
          <button className={`icon-btn ${isActive ? "icon-btn-active" : ""} ${color}`}
               {...props}
          >
               <span className={``}>
                    <Icon />
               </span>
               {children}
          </button>
     )
}

export default IconBtn