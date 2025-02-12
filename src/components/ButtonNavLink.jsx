/* eslint-disable react/prop-types */
import {NavLink} from "react-router-dom"
import  "./ButtonNavLink.css"

// This is a button navigation link component that allows the user to navigate from one page to another.
export default function ButtonNavLink({to,id,color, children}) {
  return (
    <div>
        <NavLink to={to.toString()}><button id={id.toString()} style={{backgroundColor: color}}>{children}</button></NavLink>
    </div>
  )
}
